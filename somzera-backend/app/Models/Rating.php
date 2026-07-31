<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['music_id', 'score', 'title', 'description', 'user'];

    // Relacionamento: Uma avaliação pertence a uma música
    public function music()
    {
        return $this->belongsTo(Music::class);
    }
}