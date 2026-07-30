<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MusicController extends Controller
{
    public function search(Request $request)
    {
        // 1. Pega o que o Heitor digitou
        $query = $request->input('q', 'beatles');

        // 2. Autenticação 100% Automática
        $authResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);
        $token = $authResponse->json('access_token');

        // 3. Busca os dados brutos no Spotify
        $buscaResponse = Http::withToken($token)->get('https://api.spotify.com/v1/search', [
            'q' => $query,
            'type' => 'track',
            'limit' => 5
        ]);

        // Extrai apenas o array de músicas do JSON gigante do Spotify
        $tracksBrutas = $buscaResponse->json('tracks.items');

        // 4. O FILTRO (A Mágica do BFF)
        $dadosLimpos = collect($tracksBrutas)->map(function ($track) {
            return [
                'spotify_id' => $track['id'],
                'title' => $track['name'],
                // Pega o nome do primeiro artista da lista (o Spotify manda um array de artistas)
                'artist' => $track['artists'][0]['name'] ?? 'Artista Desconhecido',
                // Pega a URL da primeira imagem da capa (o Spotify manda 3 tamanhos diferentes)
                'url_cover' => $track['album']['images'][0]['url'] ?? null,
            ];
        });

        // 5. Devolve o JSON estruturado para o React
        return response()->json($dadosLimpos);
    }
}