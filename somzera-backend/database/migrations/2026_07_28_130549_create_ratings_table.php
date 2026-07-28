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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            
            // A MÁGICA DA CHAVE ESTRANGEIRA
            $table->foreignId('music_id')->constrained('musics')->onDelete('cascade');
            
            // Dados gerados pelo usuário
            $table->integer('score'); 
            $table->string('title')->nullable(); 
            $table->text('description'); 
            
            // Usuário mockado (pois o MVP ainda não tem um sistema de login real) [cite: 422]
            $table->string('user'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
