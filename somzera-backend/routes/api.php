<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\RatingController;

// Rota de busca no Spotify
Route::get('/musics', [MusicController::class, 'search']);

// Rotas de Reviews
Route::get('/ratings', [RatingController::class, 'index']); // Lista as recentes
Route::post('/ratings', [RatingController::class, 'store']); // Salva uma nova