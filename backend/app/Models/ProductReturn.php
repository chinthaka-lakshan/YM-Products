<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReturn extends Model
{
    use HasFactory;
    protected $table = 'returns';
    protected $fillable = ['shop_id','type','return_cost'];

    public function shop(){
        return $this->belongsTo(Shop::class);
    }
}
