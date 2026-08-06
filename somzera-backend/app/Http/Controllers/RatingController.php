<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RatingController extends Controller
{
    public function index()
    {
        $recentRatings = Rating::with('music')->latest()->take(10)->get();
        return response()->json($recentRatings);
    }

    public function store(Request $request)
    {
        // 1. BLINDAGEM: Validação rigorosa dos dados recebidos
        $validated = $request->validate([
            'spotify_id'   => 'required|string',
            'music_title'  => 'required|string|max:255',
            'artist'       => 'required|string|max:255',
            'url_cover'    => 'nullable|url',
            'score'        => 'required|integer|min:1|max:5', // Impede notas bizarras
            'review_title' => 'required|string|max:255',
            'description'  => 'required|string',
            'user'         => 'required|string|max:100',
        ]);

        try {
            // 2. Cria ou acha a música
            $music = Music::firstOrCreate(
                ['spotify_id' => $validated['spotify_id']],
                [
                    'title'     => $validated['music_title'],
                    'artist'    => $validated['artist'],
                    'url_cover' => $validated['url_cover']
                ]
            );

            // 3. Cria a avaliação (Agora com limpeza de XSS)
            $rating = Rating::create([
                'music_id'    => $music->id,
                'score'       => $validated['score'],
                // strip_tags remove qualquer <script> ou tag HTML maliciosa
                'title'       => strip_tags($validated['review_title']),
                'description' => strip_tags($validated['description']),
                'user'        => strip_tags($validated['user']),
            ]);

            return response()->json([
                'message' => 'Review salva com sucesso no Somzera!',
                'rating'  => $rating
            ], 201);

        } catch (\Exception $e) {
            // BLINDAGEM: Se o banco cair, devolvemos um erro limpo em JSON, não uma tela de erro do Laravel
            Log::error('Erro ao salvar review: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Ocorreu um erro interno ao salvar a review. Tente novamente.'
            ], 500);
        }
    }

    public function showByMusic($spotify_id)
    {
        $music = Music::where('spotify_id', $spotify_id)->first();

        if (!$music) {
            return response()->json([]);
        }

        $ratings = Rating::where('music_id', $music->id)->latest()->get();
        return response()->json($ratings);
    }
}