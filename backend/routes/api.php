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

use App\Http\Controllers\ReturnController;

use App\Http\Controllers\CashflowController;


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
Route::get('/sales-reps', [AuthController::class, 'getSalesReps']);
Route::put('/sales-reps/{id}', [AuthController::class, 'updateSalesRep']);
Route::delete('/sales-reps/{id}', [AuthController::class, 'deleteSalesRep']);
Route::get('/sales-reps/{id}', [AuthController::class, 'getSalesRepById']);
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/reset-password-with-otp', [AuthController::class, 'resetPasswordWithOtp']);

Route::get('/cashflows', [CashflowController::class, 'index']);
Route::post('/cashflows', [CashflowController::class, 'store']);
Route::get('/cashflows/{id}', [CashflowController::class, 'show']);

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
Route::put('shops/{shopId}/return-balance',[ShopController::class,'updateReturnBalance']);

Route::apiResource('sales_reps', SalesRepController::class);

Route::get('/test-mail', function() {
    Mail::raw('This is a test email', function($message) {
        $message->to('diluklakshan01@gmail.com')
               ->subject('Test Email');
    });
    return 'Mail sent';
});
// routes/api.php
// Route::post('/test-email', function(Request $request) {
//     $validated = $request->validate([
//         'email' => 'required|email'
//     ]);

//     try {
//         Mail::raw('This is a test email from Postman', function($message) use ($validated) {
//             $message->to($validated['email'])
//                    ->subject('Postman Test Email');
//         });
        
//         return response()->json(['success' => true]);
//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'error' => $e->getMessage(),
//             'trace' => $e->getTraceAsString()
//         ], 500);
//     }
// });
// Route::middleware('auth:sanctum')->group(function(){
//     Route::apiResource('orders', OrderController::class);
    
// });
Route::apiResource('orders', OrderController::class);
Route::get('/calculate-order-cost/{shopId}/{orderAmount}', [OrderController::class, 'calculateOrderCost']);
Route::get('/orders/{id}/items', [OrderController::class, 'showOrderItems']);
Route::put('/orders/{id}/status',[OrderController::class,'updateStatus']);
// Route::middleware('auth:sanctum')->group(function(){
//     Route::apiResource('good-returns',GoodReturnController::class);
// });

// Route::apiResource('good-returns',GoodReturnController::class);


 //Route::post('orders',[ OrderController::class,'store']);
 Route::apiResource("returns",ReturnController::class);

 Route::get('returns/{shopId}/balance',[ReturnController::class,'getReturnBalance']);

 Route::get('returns/shop/{shopId}',[ ReturnController::class,'getShopReturns']);

 Route::get('returns/{returnId}/items',[ReturnController::class,'getReturnItems']);
 Route::post('returns/{returnId}/items',[ReturnController::class,'store']);
 Route::put('returns/{returnId}/items/{itemId"',[ReturnController::class,'getReturnItems']);
Route::delete('returns/{returnId}/items/{itemId}',[ReturnController::class, 'removeReturn']);
 Route::apiResource('returns',ReturnController::class)->except(['index']);