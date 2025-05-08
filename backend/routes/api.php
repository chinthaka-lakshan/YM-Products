<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SalesRepController;
use App\Http\Controllers\PurchaseStockController;
use App\Http\Controllers\OrderController;

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

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/sales-rep/login', [AuthController::class, 'repLogin']);
Route::post('/sales-rep/register', [AuthController::class, 'registerRep']);
Route::get('/sales-reps', [AdminController::class, 'getSalesReps']);

// Protected admin routes
Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    
    Route::post('/admin/logout', [AuthController::class, 'logout']);
});

// Protected sales rep routes
Route::middleware(['auth:sanctum', 'ability:sales_rep'])->group(function () {
    Route::post('/rep/logout', [AuthController::class, 'logout']);
    // Add other sales rep routes here
});

// Protected user routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Add other protected user routes here
});

// Resource routes
Route::apiResource('items', ItemController::class);
Route::apiResource('purchase_stock', PurchaseStockController::class);
Route::apiResource('shops', ShopController::class);
Route::apiResource('sales_reps', SalesRepController::class);
Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('orders', OrderController::class);
});



 //Route::post('orders',[ OrderController::class,'store']);