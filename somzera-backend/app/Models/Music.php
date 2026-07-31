<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $table = 'musics';

    // Colunas liberadas para preenchimento em massa
    protected $fillable = ['spotify_id', 'title', 'artist', 'url_cover'];

    // Relacionamento: Uma música tem várias avaliações
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}