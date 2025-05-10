<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoodReturn extends Model
{
    use HasFactory;
    
    protected $table = 'good_returns';

    protected $fillable = ['shop_id','return_cost'];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

}
