<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    // Método para listar as últimas reviews na Home
    public function index()
    {
        // Traz as últimas 10 reviews JÁ COM os dados da música atrelada
        $recentRatings = Rating::with('music')->latest()->take(10)->get();
        return response()->json($recentRatings);
    }

    // Método para salvar uma nova review
    public function store(Request $request)
    {
        // 1. O Pulo do Gato: Acha a música pelo spotify_id ou cria uma nova
        $musics = Music::firstOrCreate(
            ['spotify_id' => $request->spotify_id],
            [
                'title' => $request->music_title,
                'artist' => $request->artist,
                'url_cover' => $request->url_cover
            ]
        );

        // 2. Cria a avaliação atrelada ao ID interno dessa música
        $rating = Rating::create([
            'music_id' => $musics->id,
            'score' => $request->score,
            'title' => $request->review_title,
            'description' => $request->description,
            'user' => $request->user,
        ]);

        return response()->json([
            'message' => 'Review salva com sucesso no Somzera!',
            'rating' => $rating
        ], 201);
    }

    // Método para buscar as reviews de uma música específica
    public function showByMusic($spotify_id)
    {
        // 1. Procuramos a música no nosso banco usando o ID do Spotify
        $music = Music::where('spotify_id', $spotify_id)->first();

        // 2. Se a música não existe no nosso banco, significa que ninguém nunca avaliou ela!
        // Então, retornamos um array vazio direto para o Front-end.
        if (!$music) {
            return response()->json([]);
        }

        // 3. Se ela existe, usamos o relacionamento para buscar todas as avaliações dela, da mais nova para a mais velha
        $ratings = Rating::where('music_id', $music->id)->latest()->get();

        return response()->json($ratings);
    }
}