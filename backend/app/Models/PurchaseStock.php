<?php

namespace App\Models;

use App\Models\PurchaseStock;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseStock extends Model
{
    use HasFactory;
    // protected $table = 'purchase_stock';
    protected $fillable = ['item','weight'];
}
