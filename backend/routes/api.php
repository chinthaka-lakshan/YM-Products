<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/admin-login', [AuthController::class, 'adminLogin']);
Route::post('/register-rep', [AuthController::class, 'registerRep']);
Route::post('/rep-login', [AuthController::class, 'repLogin']);
Route::post('/items',[ItemController::class, 'store']);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
