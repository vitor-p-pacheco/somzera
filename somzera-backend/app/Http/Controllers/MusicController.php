<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MusicController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        // BLINDAGEM: Se a busca vier vazia, nem bate no Spotify
        if (empty($query)) {
            return response()->json([]);
        }

        try {
            // 1. Autenticação
            $authResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
                'client_id' => env('SPOTIFY_CLIENT_ID'),
                'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
            ]);

            // BLINDAGEM: Verifica se o Spotify recusou as credenciais
            if ($authResponse->failed()) {
                Log::error('Falha ao autenticar no Spotify: ' . $authResponse->body());
                return response()->json(['error' => 'Falha na comunicação com o provedor de música.'], 502);
            }

            $token = $authResponse->json('access_token');

            // 2. Busca os dados
            $buscaResponse = Http::withToken($token)->get('https://api.spotify.com/v1/search', [
                'q' => $query,
                'type' => 'track',
                'limit' => 5
            ]);

            // BLINDAGEM: Verifica se a busca deu erro (ex: limite de requisições excedido)
            if ($buscaResponse->failed()) {
                Log::error('Falha ao buscar no Spotify: ' . $buscaResponse->body());
                return response()->json(['error' => 'Não foi possível realizar a busca no momento.'], 502);
            }

            $tracksBrutas = $buscaResponse->json('tracks.items') ?? [];

            // 3. O FILTRO
            $dadosLimpos = collect($tracksBrutas)->map(function ($track) {
                return [
                    'spotify_id' => $track['id'] ?? null,
                    'music_title' => $track['name'] ?? 'Título Desconhecido',
                    'artist' => $track['artists'][0]['name'] ?? 'Artista Desconhecido',
                    'url_cover' => $track['album']['images'][0]['url'] ?? null,
                ];
            })->filter(function($track) {
                // BLINDAGEM: Garante que não vamos devolver músicas sem ID
                return !is_null($track['spotify_id']);
            })->values();

            return response()->json($dadosLimpos);

        } catch (\Exception $e) {
            Log::error('Erro inesperado no MusicController: ' . $e->getMessage());
            return response()->json(['error' => 'Erro interno no servidor de buscas.'], 500);
        }
    }
}