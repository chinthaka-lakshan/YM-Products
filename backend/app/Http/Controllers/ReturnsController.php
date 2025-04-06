<?php

namespace App\Http\Controllers;

use App\Models\ReturnItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReturnsController extends Controller
{
    /**
     * Display a listing of all returns.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(ReturnItem::all());
    }

    /**
     * Store a newly created return in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shop'   => 'required|string|max:255',
            'item'   => 'required|string|max:255',
            'weight' => 'required|integer',
            'qty'    => 'required|integer',
            'type'   => 'required|string|max:255',
            'date'   => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        $return = ReturnItem::create($request->only([
            'shop', 'item', 'weight', 'qty', 'type', 'date'
        ]));

        return response()->json([
            'message' => 'Return created successfully',
            'return'  => $return
        ], 201);
    }

    /**
     * Update the specified return in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'shop'   => 'required|string|max:255',
            'item'   => 'required|string|max:255',
            'weight' => 'required|integer',
            'qty'    => 'required|integer',
            'type'   => 'required|string|max:255',
            'date'   => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            $return = ReturnItem::findOrFail($id);
            $return->update($request->only([
                'shop', 'item', 'weight', 'qty', 'type', 'date'
            ]));

            return response()->json([
                'message' => 'Return updated successfully',
                'return'  => $return
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Return not found'
            ], 404);
        }
    }

    /**
     * Remove the specified return from the database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $return = ReturnItem::findOrFail($id);
            $return->delete();

            return response()->json([
                'message' => 'Return deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Return not found'
            ], 404);
        }
    }
}
