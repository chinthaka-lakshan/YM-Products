<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SalesRep;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class SalesRepController extends Controller
{
    /**
     * Display a listing of the Sales Representatives.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(SalesRep::all(), 200);
    }

    /**
     * Store a newly created Sales Representative.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required|string|max:225',
            "email" => 'required|email|unique:sales_reps,email',
            "nic" => 'required|string|max:255|unique:sales_reps,nic',
            "contact_number" => 'required|string|max:255',
            "password" => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $salesrep = SalesRep::create([
                'name' => $request->name,
                'email' => $request->email,
                'nic' => $request->nic,
                'contact_number' => $request->contact_number,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'Representative registered successfully',
                'salesrep' => $salesrep
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified Sales Representative.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salesrep = SalesRep::find ($id);

        if (!$salesrep) {
            return response()->json(['message' => 'Sales Representative not found'], 404);
        }

        return response()->json($salesrep, 200);
    }

    /**
     * Update the specified Sales Representative.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $salesrep = SalesRep::find($id);

        if (!$salesrep) {
            return response()->json(['message' => 'Sales Representative not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            "name" => 'sometimes|string|max:225',
            "email" => 'sometimes|email|unique:sales_reps,email,' . $id,
            "nic" => 'sometimes|string|max:225|unique:sales_reps,nic,' . $id,
            "contact_number" => 'sometimes|string|max:225',
            "password" => 'sometimes|string|max:225',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $salesrep->update([
                'name' => $request->name ?? $salesrep->name,
                'email' => $request->email ?? $salesrep->email,
                'nic' => $request->nic ?? $salesrep->nic,
                'contact_number' => $request->contact_number ?? $salesrep->contact_number,
                'password' => $request->password ? Hash::make($request->password) : $salesrep->password,
            ]);

            return response()->json([
                'message' => 'Sales Representative updated successfully',
                'salesrep' => $salesrep
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified Sales Representative.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $salesrep = SalesRep::find($id);

        if (!$salesrep) {
            return response()->json(['message' => 'Sales Representative not found'], 404);
        }

        try {
            $salesrep->delete();
            return response()->json(['message' => 'Sales Representative deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
