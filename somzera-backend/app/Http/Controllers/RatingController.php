<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    public function index()
    {
        $recentRatings = Rating::with('music')
            ->latest()
            ->take(10)
            ->get();

        return response()->json($recentRatings);
    }

    public function store(Request $request)
    {
        // VALIDAÇÃO ROBUSTA DOS DADOS
        $validator = Validator::make($request->all(), [
            'spotify_id' => 'required|string|max:50',
            'music_title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'url_cover' => 'nullable|url|max:500',
            'score' => 'required|integer|min:1|max:5',
            'review_title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'user' => 'required|string|max:100',
        ], [
            // Mensagens personalizadas em português
            'score.min' => 'A nota mínima é 1 estrela.',
            'score.max' => 'A nota máxima é 5 estrelas.',
            'description.max' => 'A review não pode ter mais de 2000 caracteres.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dados inválidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Busca ou cria a música
            $music = Music::firstOrCreate(
                ['spotify_id' => $request->spotify_id],
                [
                    'title' => $request->music_title,
                    'artist' => $request->artist,
                    'url_cover' => $request->url_cover
                ]
            );

            // Cria a avaliação
            $rating = Rating::create([
                'music_id' => $music->id,
                'score' => $request->score,
                'title' => $request->review_title,
                'description' => $request->description,
                'user' => $request->user,
            ]);

            // Carrega o relacionamento para retornar completo
            $rating->load('music');

            return response()->json([
                'message' => 'Review salva com sucesso no Somzera!',
                'rating' => $rating
            ], 201);

        } catch (\Exception $e) {
            Log::error('Erro ao salvar review', [
                'message' => $e->getMessage(),
                'data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Erro interno ao salvar review.'
            ], 500);
        }
    }

    public function showByMusic($spotify_id)
    {
        $music = Music::where('spotify_id', $spotify_id)->first();

        if (!$music) {
            return response()->json([]);
        }

        $ratings = Rating::where('music_id', $music->id)
            ->latest()
            ->get();

        return response()->json($ratings);
    }
}