<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Shop;
use App\Models\Item;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\GoodReturn;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    // Create new order
    public function store(Request $request)
    {
        //\Log::info('Authorization Header:',['token'=>$request->header('Authorization')]);
        // $user = Auth::guard('admin')->user();
        // if(!$user){
        //     return response()->json(['error'=>'Unauthorized'],401);
        // }
        // $user_name=$user->name;

        $validated = $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'total_price' => 'required|numeric',
           'items'=>'required|array',
           'items.*.item_id'=>'required|exists:items,id',
           'items.*.quantity'=>'required|integer|min:1',
           
        ]);

        \Log::info("Incoming order request:",$request->all());
        //check for good return
        $goodReturnValue = GoodReturn::where('shop_id',$validated['shop_id'])->sum('return_cost');
                              

        
        $totPrice=$validated['total_price'];
        $orderCost=max(0,$totPrice-$goodReturnValue);
        if($totPrice < $goodReturnValue){
            $goodReturnValue=$goodReturnValue-$totPrice;
            $totPrice=0;
            GoodReturn::where('shop_id',$validated['shop_id'])->update([
                'return_cost'=>$goodReturnValue
            ]);

            // return response()->json([
            //     'message'=>'Order cost covered by good return.Remaining balance stored for future orders.',
            //     'original_order_cost'=>$validated['total_price'],
            //     'remaining_good_return'=>$goodReturnValue
            // ]);
        }
        elseif($totPrice>=$goodReturnValue){
            GoodReturn::where('shop_id',$validated['shop_id'])->delete();
            $goodReturnValue=0;
            // return response()->json([
            //     'message'=>'Good Return cost Fully Claimed',
            //     'original_order_cost'=>$totPrice,
            //     'order_cost'=>$orderCost
            // ]);
        }
       // $order = Order::create($request->all());

       try{
        
        $order = Order:: create([
            'total_price'=>$orderCost,
            'return_balance'=>$goodReturnValue,
            'shop_id'=>$validated['shop_id'],
            //'user_name'=>"yasantha",
            'user_name'=>$request->user_name,
            'status'=>"PENDING",
           ]);
           $formattedItems=[];
           foreach($validated['items'] as $item){
            $stockQuantity=Item::find($item['item_id'])->quantity;
            if($item['quantity']>$stockQuantity){
                return response()->json([
                    'error'=>'Insufficient stock for item ID'. $item['item_id'],
                    'available_stock'=>$stockQuantity,
                    'requested_quantity'=>$item['quantity']
                ],400);
            }
            Item::where('id',$item['item_id'])->decrement('quantity',$item['quantity']);
            $formattedItems[$item['item_id']]=['quantity'=>$item['quantity']];
           }
           \Log::info('Attching items:',$formattedItems);
           $order->items()->attach($formattedItems);
        
        //$order = Order:: create($validated);
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load(['items'=> function($query){
                    $query->select('items.id','items.item','items.unitPrice','order_items.quantity');
                }]),
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

    public function calculateOrderCost($shopId, $orderAmount){
        if(!Shop::find($shopId)){
            return response()->json(['error'=>"Shop not found!"],404);
        }

        $goodReturnValue = GoodReturn::where('shop_id',$shopId)->sum('return_cost');

        $orderCost = max(0,$orderAmount-$goodReturnValue);

        if($orderAmount>=$goodReturnValue){
            GoodReturn::where('shop_id',$shopId)->delete();
            $remainingGoodReturn=0;
        }else{
            $remainingGoodReturn=$goodReturnValue-$orderAmount;
            GoodReturn::where('shop_id',$shopId)->update(['return_cost'=>$remainingGoodReturn]);
        }
        return response()->json([
            'shop_id'=>$shopId,
            'orginal_order_order_amount'=>$orderAmount,
            'return_balance'=>$orderCost,
            'remaining_good_return'=> $orderAmount<$goodReturnValue ? $goodReturnValue-$orderAmount : 0
        ]);
    }
    //
}
