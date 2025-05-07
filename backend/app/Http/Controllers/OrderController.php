<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use App\Models\ProductReturn;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    // Create new order
    public function store(Request $request)
    {
        \Log::info('Authorization Header:',['token'=>$request->header('Authorization')]);
        
        $validated = $request->validate([
            'total_price' => 'required|numeric',
            'return_balance' => 'nullable|numeric',
            'shop_id' => 'required|exists:shops,id',
            'user_name' => 'required|string|max:255',
        ]);

        //check for good return
        $goodReturnValue = ProductReturn::where('shop_id',$request->shop_id)
                                 ->where('type','good')
                                 ->sum('return_cost');

        $totPrice=$request->total_price;
       
        if($totPrice < $goodReturnValue){
            $goodReturnValue=$goodReturnValue-$totPrice; 
            $totPrice=0;
            ProductReturn::where('shop_id',$request->shop_id)
                  ->where('type','good')
                  ->update(['return_cost'=> $goodReturnValue]);
        }
        elseif($totPrice>=$goodReturnValue){
            $totPrice=$totPrice-$goodReturnValue;
            $goodReturnValue=0;
            ProductReturn::where('shop_id',$request->shop_id)
                  ->where('type','good')
                  ->update(['return_cost'=> $goodReturnValue]);
        }
       // $order = Order::create($request->all());

       try{
        // $order = Order:: create([
        //     'total_price'=>$totPrice,
        //     'return_balance'=>$goodReturnValue,
        //     'shop_id'=>$request->shop_id,
        //     'user_name'=>$request->user_name,
        //    ]);
        $order = Order:: create($validated);
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ], 201);
       }catch(\Exception $e){
        return response()->json([
            'error'=>"Failed to create order",
        'message'=> $e->getMessage()
        ],500);
       }
    }

    // Show single order
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // Update order
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->update($request->all());

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order
        ]);
    }

    // Delete order
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }

    //
}
