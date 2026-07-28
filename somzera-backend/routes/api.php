<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/ping', function () {
    return response()->json([
        'status' => 'sucesso',
        'mensagem' => 'Servidor Conectado! O backend do Somzera nasceu!'
    ]);
});

Route::get('/spotify/busca', function () {
    // 1. O Backend pede o token sozinho silenciosamente
    $authResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
        'grant_type' => 'client_credentials',
        'client_id' => env('SPOTIFY_CLIENT_ID'),
        'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
    ]);

    // Extraímos apenas o texto do token da resposta
    $token = $authResponse->json('access_token');

    // 2. O Backend já usa esse token novo na mesma hora para buscar a música
    $buscaResponse = Http::withToken($token)->get('https://api.spotify.com/v1/search', [
        'q' => 'aphex twin', // Pode mudar para testes!
        'type' => 'track',
        'limit' => 3
    ]);

    // 3. Devolve os dados pro Heitor, sem ninguém copiar nada na mão!
    return $buscaResponse->json();
});