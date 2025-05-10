<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SalesRepController;
use App\Http\Controllers\PurchaseStockController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\GoodReturnController;

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
Route::post('/admin-login', [AuthController::class, 'adminLogin']);
Route::post('/rep-login', [AuthController::class, 'repLogin']);

// Protected admin routes
Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::post('/register-rep', [AuthController::class, 'registerRep']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    // Add other admin-only routes here
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

// Route::middleware('auth:sanctum')->group(function(){
//     Route::apiResource('orders', OrderController::class);
    
// });
Route::apiResource('orders', OrderController::class);
Route::get('/calculate-order-cost/{shopId}/{orderAmount}', [OrderController::class, 'calculateOrderCost']);
// Route::middleware('auth:sanctum')->group(function(){
//     Route::apiResource('good-returns',GoodReturnController::class);
// });

Route::apiResource('good-returns',GoodReturnController::class);


 //Route::post('orders',[ OrderController::class,'store']);