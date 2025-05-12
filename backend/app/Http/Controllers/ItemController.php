<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use App\Models\Item;

class ItemController extends Controller
{

    public function index(){
        
        return response()->json(Item::all());
    }
    
    public function store(Request $request)
    {
       $validator = Validator::make($request->all(),[
            'item'=> 'required|string|max:255',
            'unitPrice'=>'required|numeric',
            'quantity'=>'required|integer',
        ]);
        if ($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ],422);
        }

        

       try{
         $item = Item::create($request->only(['item','unitPrice','quantity']));

         return response()->json([
            'message'=> 'Item Added Successfully',
            'item'=>$item
        ],201);
       }catch(\Exception $e){
            return response()->json([
                'message'=> 'Error when Adding Item',
                'item'=>$e->getMessage()
            ],500);
        }
    }

    public function update(Request $request,$id){
        $item = Item::find($id);
        if(!$item){
            return response()->json(['message'=>'Item not found'],404);
        }$validator = Validator::make($request->all(),[
            'item'=> 'sometimes|string|max:255',
            'unitPrice'=> 'someTimes| numeric',
            'quantity'=>'sometimes|integer',
        ]);
        if($validator->fails()){
            return response()->json([
                'message'=>'Validdation failed',
                'errors'=>$validator->errors()
            ],422);
        }

        try{
            $item->update($request->only(['item','unitPrice','quantity']));

            return response()->json([
                'message'=>'Item Updated Successfully',
                'item'=> $item
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Error when Updating Item',
                'error'=>$e->getMessage()
            ],500);
        }
    }


    public function destroy($id)
    {
        $item = Item::find($id);
        if(!$item){
            return response()->json(['message'=> 'Item not found'],404);
        }
        try{
            $item->delete();
            return response()->json(['message'=>'Item Deleted Successfully']);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error when deleting Item',
                'error'=> $e->getMessage()
            ],500);
        }
    }
    
    public function show($id)
    {
        \Log::info("Fetching item with ID: $id");

        $item = Item::find($id);
        if(!$item){
            return response()->json(['message'=>'Item not found'],404);
        }

        return response()->json($item);
    }
}
