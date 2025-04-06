<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseStock;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class PurchaseStockController extends Controller
{
    public function index(){
        return response()->json(PurchaseStock::all());

    }

   
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'item'=>'required|string|max:255',
            'weight'=>'required|numeric'
        ]);
        if($validator->fails()){
            return response()->json([
                'message'=>'Validation failed',
                'errors'=>$validator->errors()
            ],422);
        }

        try{
            $purchase_stock=PurchaseStock::create($request->only(['item','weight']));
            return response()->json([
                'mesage'=>'Item Added Successfully',
                'purchase_stock'=>$purchase_stock
            ],201);
        }catch(\Exception $e){
            return response()->json([
                'message'=> 'Error when Adding Item',
                'purchase_stock'=>$e->getMessage()
            ],500);
        }
        

    }

  


    public function update(Request $request,$id){
        $purchase_stock = PurchaseStock::find($id);
        if(!$purchase_stock){
            return response()->json(['message'=>'Item not found'],404);
        }
        $validator = Validator::make($request->all(),[
            'item'=>'sometimes|string|max:255',
            'weight'=>'sometimes|numeric'
        ]);
        
        if($validator->fails()){
            return response()->json([
                'errors'=>$validator->errors()
            ],422);
        }
        try{
           
            $purchase_stock->update($request->only(['item','weight']));
        return response()->json([
            'message'=>'Stock  Updated Successfully',
            'item'=>$purchase_stock
        ],200);
        }catch(\Exception $e){
            return respons()->json([
                'message'=>'Error when  Updating Purchase Stock',
                'error'=>$e->getMessage()
            ],500);
        }
        }

        public function destroy($id)
        {
            $purchase_stock = PurchaseStock::find($id);

            if (!$purchase_stock) {
                return response()->json(['message' => 'Item Not found'], 404);
            }

            try {
                $purchase_stock->delete();
                return response()->json(['message' => 'Item Deleted Successfully'], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Error when deleting Item',
                    'error' => $e->getMessage()
                ], 500);
            }
}

   
}
