<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cashflow;
use App\Models\Order; // ✅ Import Order model
use Illuminate\Support\Facades\Validator;

class CashflowController extends Controller
{
    public function index()
    {
        return response()->json(Cashflow::all(), 200);
    }

    public function store(Request $request)
    {
        // ✅ Step 1: Get the total income from the orders table
        $totalIncome = Order::sum('total_price');

        // ✅ Step 2: Replace income in the request with $totalIncome
        $request->merge(['income' => $totalIncome]);

        // ✅ Step 3: Validate the rest of the fields (no need to validate income anymore)
        $validator = Validator::make($request->all(), [
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
        $cashflow = Cashflow::find($id);

        if (!$cashflow) {
            return response()->json(['message' => 'Cashflow not found'], 404);
        }

        return response()->json($cashflow, 200);
    }
}
