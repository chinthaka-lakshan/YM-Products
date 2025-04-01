<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'item'=> 'required|string|max:255',
            'unitPrice'=>'required|numeric',
            'quantity'=>'required|integer',
        ]);

        $item = Item::create([
            'item'=>$request->item,
            'quantity'=>$request->unitPrice,
            'quantity'=> $request->quantity,
        ]);


        return response()->json(['message'=> 'Item added Successfully','data'=>$item]);
    }
}
