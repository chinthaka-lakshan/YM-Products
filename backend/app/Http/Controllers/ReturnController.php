<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Returns;
use App\Models\Item;
use App\Models\Shop;

class ReturnController extends Controller
{
    public function store(Request $request){

        \Log::info("Incoming Request:",$request->all());
        
            $validated = $request->validate([
            'shop_id'=>'required|exists:shops,id',
            'type'=>'required|string|in:good,bad',
            'return_cost'=>'required|numeric|min:0',
            'rep_name'=>'required|string',
            
        ]);
        

        //$validated['type']=strtolower($validated['type']);
        //DB::beginTransaction();
        $returns=null;
        try{
            if($validated['type']=='good'){
                $request->validate([
                        'items'=>'required|array|min:1',
                        'items.*.item_id'=>'required|exists:items,id',
                        'items.*.qty'=>'required|integer|min:1',
                    ]);
                    $returns = DB::transaction(function () use ($validated){
                $returnRecord =  Returns::create([
                    'shop_id'=>$validated['shop_id'],
                    'type'=>$validated['type'],
                    'return_cost'=>$validated['return_cost'],
                    'rep_name'=>$validated['rep_name'],
                ]);
         
                //add return quantity to item table if return type is good

                if(!empty($validated['items']) && is_array($validated['items'])){
                    
                    foreach($validated['items'] as $itemData){
                        $item=Item::find($itemData['item_id']);
                        if(!$item){
                            
                            throw new \Exception("Item with id {$itemData['item_id']} not found");
                            
                        }

                        $item->increment('quantity',$itemData['qty']);
                    }
                }
                 return $returnRecord;
            });
            }else{
                $returns = Returns::create([
                    'shop_id'=>$validated['shop_id'],
                    'type'=>$validated['type'],
                    'return_cost'=>$validated['return_cost'],
                    'rep_name'=>$validated['rep_name'],
                ]);
            }
             
            return response()->json([
                'message'=> 'Return stored successfully.',
                'data'=>$returns,
                
            ],201);
        }catch(\Exception $e){
           return response()->json(['message'=>'Failed to store return','error'=> $e->getMessage()],400);
        }  
    }

    public function update(Request $request,$returnId, $shopId){
        $validated = $request->validate([
            'return_cost'=>'required|numeric|min:0',
        ]);
        $returnItem = Returns::where('id',$returnId)->where('shop_id',$shopId)->first();
        
        if(!$returnItem){
            return response()->json(['message'=> 'Return item not found for this shop'],404);
        }

        $returnItem->update(['return_cost'=>$validated['return_cost']]);

        return response()->json([
            'message'=>'Return cost updated successfully.',
            'data'=>$returnItem,
        ]);
        
    }

    public function destroy($id){
        $returnItem = Returns::find($id);
        if(!$returnItem){
            return response()->json(['message'=> 'Return item not found'],404);
        }
        $returnItem->delete();
        return response()->json(['message'=> 'Return deleted successfully']);
    }

    public function show($shopId){
        $returnData = Returns::with('shop')->where('shop_id',$shopId)->get();

        if($returnData->isEmpty()){
            return response()->json(['message'=> 'No return cost found for this shop.'],404);
        }
        $totalReturnCost = $returnData->sum('return_cost');

        return response()->json([
            'message'=>'Return cost found for this shop.',
            'total_return_cost'=>$totalReturnCost,
            'returns'=>$returnData
        ]);
    }

    public function index()
    {
        $returns = Returns::all();
        return response()->json(['message'=> 'Return fetched successfully','data'=>$returns]);
    }
}
