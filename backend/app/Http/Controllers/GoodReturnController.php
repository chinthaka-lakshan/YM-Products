<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GoodReturn;

class GoodReturnController extends Controller
{
    public function store(Request $request){
        $validated =  $request->validate([
            'shop_id'=>'required|exists:shops,id',
            'return_cost'=>'required|numeric|min:0',
        ]);

        $goodReturn=GoodReturn::create($validated);

        return response()->json([
            'message'=>'Good return cost stored successfully.',
            'data'=>$goodReturn,
        ],201);
    }

    public function show($shopId){
        $goodReturn = GoodReturn::where('shop_id',$shopId)->first();

        if(!$goodReturn){
            return response()->json(['message'=>'No good return cost for this shop.'],404);

        }
        return response()->json(['data'=> $goodReturn]);
    }

    public function update(Request $request,$shopId){
        $validated=$request->validate([
            'return_cost'=> 'required|numeric|min:0',
        ]);

        $goodReturn = GoodReturn::where('shop_id',$shopId)->first();

        if(!goodReturn){
            return response()->json(['message'=>'No Good returncost for this shop.'],404);
        }
        $goodReturn->update(['return_cost'=>$validated['return_cost']]);

        return response()->json([
            'message'=> 'Good return cost update successfully.',
            'data'=> $goodReturn,
        ]);


    }

    public function destroy($shopId){
        $goodReturn = GoodReturn::where('shop_id',$shopId)->first();

        if(!$goodReturn){
            return response()->json(['message'=> 'No good return cost found.'],404);
        }
        $goodReturn->delete();
        return response()->json(['message'=>'Good return cost deleted successfully']);
    }

}
