<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('musics', function (Blueprint $table) {
            $table->id();
            
            // Dados vindos da API do Spotify
            $table->string('spotify_id')->unique(); // O ID real da música lá no Spotify [cite: 393]
            $table->string('name'); // Nome da música [cite: 394]
            $table->string('artist'); // Nome do artista [cite: 394]
            $table->string('url_cover'); // A URL da imagem da capa [cite: 395]
            
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music');
    }
};
