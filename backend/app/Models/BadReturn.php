<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BadReturn extends Model
{
    use HasFactory;

    protected $table = 'bad_returns';
    
    protected $fillable = ['shop_id', 'return_cost','reason'];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    
    }
}
