<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cashflow;
use Illuminate\Support\Facades\Validator;

class CashflowController extends Controller
{
    public function index()
    {
        return response()->json(Cashflow::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'income' => 'required|string|max:225',
            'transport' => 'required|string|max:225',
            'other' => 'required|string|max:255',
            'expenses' => 'required|string|max:255',
            'profit' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $cashflow = Cashflow::create($request->only(['income', 'transport', 'other', 'expenses', 'profit']));

            return response()->json([
                'message' => 'Cashflow created successfully',
                'cashflow' => $cashflow
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

     public function show($id)
    {
        $cashflow = Cashflow::find ($id);

        if (!$cashflow) {
            return response()->json(['message' => 'Cachflow not found'], 404);
        }

        return response()->json($cashflow, 200);
    }
}
