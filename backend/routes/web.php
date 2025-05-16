<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

use App\Mail\RepMail;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-email', function () {
    try {
        // Send test email
        Mail::to('mjcdlakshanbuss@gmail.com')->send(new \App\Mail\RepMail());
        
        // Return JSON response with success and configuration details
        return response()->json([
            'success' => true,
            'message' => 'Test email sent successfully',
            'mail_config' => [
                'driver' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'username' => config('mail.mailers.smtp.username'),
                'from' => config('mail.from'),
                'encryption' => config('mail.mailers.smtp.encryption')
            ]
        ]);
    } catch (\Exception $e) {
        // Return detailed error response if sending fails
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'solution' => [
                '1. Verify your SMTP credentials in .env',
                '2. Ensure 2FA is enabled and using App Password',
                '3. Check Gmail account security settings',
                '4. Try changing MAIL_ENCRYPTION to ssl with port 465'
            ],
            'current_config' => config('mail')
        ], 500);
    }
});

