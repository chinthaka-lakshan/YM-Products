<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class PasswordResetOtp extends Model
{
    protected $table = 'password_reset_otps';
    
    protected $fillable = [
        'email',
        'otp',
        'created_at'
    ];
    
    public $timestamps = false;
    
    protected $primaryKey = 'email';
    public $incrementing = false;
    
    // Add this to ensure created_at is treated as Carbon instance
    protected $dates = ['created_at'];
    
    // For Laravel 9+ (alternative to $dates)
    protected $casts = [
        'created_at' => 'datetime'
    ];
}