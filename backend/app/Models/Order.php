<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_price',
        'return_balance',
        'shop_id',
        'user_name',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
