<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MusicController extends Controller
{
    public function search(Request $request)
    {
        // Validação básica do parâmetro de busca
        $request->validate([
            'q' => 'required|string|min:2|max:100'
        ]);

        $query = $request->input('q');

        // CACHE DO TOKEN: Guarda por 50 minutos (o token dura 1 hora)
        $token = Cache::remember('spotify_access_token', 3000, function () {
            try {
                $authResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials',
                    'client_id' => env('SPOTIFY_CLIENT_ID'),
                    'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
                ]);

                if ($authResponse->successful()) {
                    return $authResponse->json('access_token');
                }

                Log::error('Falha na autenticação Spotify', [
                    'response' => $authResponse->body()
                ]);
                return null;
            } catch (\Exception $e) {
                Log::error('Erro ao conectar com Spotify', [
                    'message' => $e->getMessage()
                ]);
                return null;
            }
        });

        if (!$token) {
            return response()->json([
                'error' => 'Não foi possível conectar ao Spotify no momento.'
            ], 503);
        }

        // Busca no Spotify
        try {
            $buscaResponse = Http::withToken($token)
                ->timeout(10) // Timeout de 10 segundos
                ->get('https://api.spotify.com/v1/search', [
                    'q' => $query,
                    'type' => 'track',
                    'limit' => 10
                ]);

            if (!$buscaResponse->successful()) {
                Log::error('Erro na busca Spotify', [
                    'status' => $buscaResponse->status(),
                    'body' => $buscaResponse->body()
                ]);
                return response()->json([
                    'error' => 'Erro ao buscar músicas no Spotify.'
                ], 502);
            }

            $tracksBrutas = $buscaResponse->json('tracks.items') ?? [];

            // Filtra e limpa os dados
            $dadosLimpos = collect($tracksBrutas)->map(function ($track) {
                return [
                    'spotify_id' => $track['id'],
                    'music_title' => $track['name'],
                    'artist' => $track['artists'][0]['name'] ?? 'Artista Desconhecido',
                    'url_cover' => $track['album']['images'][0]['url'] ?? null,
                ];
            });

            return response()->json($dadosLimpos);

        } catch (\Exception $e) {
            Log::error('Erro na requisição Spotify', [
                'message' => $e->getMessage()
            ]);
            return response()->json([
                'error' => 'Erro ao processar busca de músicas.'
            ], 500);
        }
    }
}