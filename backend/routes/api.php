<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route as FacadeRoute;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ShopController;


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

// Authentication routes
FacadeRoute::post('/admin-login', [AuthController::class, 'adminLogin']);
FacadeRoute::post('/register-rep', [AuthController::class, 'registerRep']);
FacadeRoute::post('/rep-login', [AuthController::class, 'repLogin']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // You can move the shop routes here if you want them protected
});

// Item routes
FacadeRoute::post('/items', [ItemController::class, 'store']);

// Shop routes
Route::get('/shops', [ShopController::class, 'index']);

// Protected routes
FacadeRoute::middleware('auth:sanctum')->group(function () {
    FacadeRoute::get('/user', function (Request $request) {
        return $request->user();
    });


    
    // Add other protected routes here
});