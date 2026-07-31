<?php

// importa as funções da classe migration, que opera principalmente na conexão com o banco
use Illuminate\Database\Migrations\Migration;
// importa as funções da classe Blueprint, que contempla a lógica de manipulação das tabelas, como
// criação de colunas, etc...
use Illuminate\Database\Schema\Blueprint;
// importa as funções da classe Schema, que contempla criação e exclusão de tabelas entre outras 
// manipulações macro das tabelas
use Illuminate\Support\Facades\Schema;

// cria uma nova classe que herda os atributos de Migration e a retorna para ser transformada
// em um objeto após a execução do artisan migrate. A nova classe pode possuir metodos proprios 
return new class extends Migration
{
    // cria uma função que roda a migração sem retornar valor. É executada no artisan migrate
    public function up(): void
    {
        // a função up() irá 
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            
            // A MÁGICA DA CHAVE ESTRANGEIRA
            $table->foreignId('music_id')->constrained('musics')->onDelete('cascade');
            
            // Dados gerados pelo usuário
            $table->integer('score'); 
            $table->string('title')->nullable(); 
            $table->text('description')->nullable(); 
            
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
