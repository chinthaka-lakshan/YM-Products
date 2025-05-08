<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Admin Registration (Only for Admins)
    public function registerRep(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:6',
            'nic' => 'required|string|max:20|unique:admins',
            'contact_number' => 'required|string|max:20'
        ]);
    
        $admin = Admin::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'nic' => $validated['nic'],
            'contact_number' => $validated['contact_number'],
            'role' => 'sales_rep'
        ]);
    
        return response()->json([
            'message' => 'Sales rep created successfully',
            'data' => $admin
        ], 201);
    }
    // Get sells rep list
    public function getSalesReps()
    {
        return response()->json(
            Admin::where('role', 'sales_rep')
                ->select('id', 'name', 'email', 'nic', 'contact_number', 'created_at')
                ->get(), 
            200
        );
    }
    // Admin Login
    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'token' => $token,
            'admin' => $admin,
        ]);
    }

    // Sales Rep Login
    public function repLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)
                     ->where('role', 'sales_rep')
                     ->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $admin->createToken('rep-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => $admin,
        ]);
    }

    /**
     * Update a sales representative
     */
    public function updateSalesRep(Request $request, $id)
    {
        try {
            $salesRep = Admin::where('id', $id)
                        ->where('role', 'sales_rep')
                        ->firstOrFail();

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:admins,email,'.$id,
                'password' => 'sometimes|string|min:6',
                'nic' => 'sometimes|string|max:20|unique:admins,nic,'.$id,
                'contact_number' => 'sometimes|string|max:20'
            ]);

            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $salesRep->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Sales representative updated successfully',
                'data' => $salesRep->only(['id', 'name', 'email', 'nic', 'contact_number', 'role'])
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sales representative not found'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Failed to update sales rep: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update sales representative'
            ], 500);
        }
    }

    // Regular User Registration
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }
    /**
     * Get a single sales representative by ID
     */
    public function getSalesRepById($id)
    {
        try {
            $salesRep = Admin::where('id', $id)
                        ->where('role', 'sales_rep')
                        ->select('id', 'name', 'email', 'nic', 'contact_number', 'created_at')
                        ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $salesRep
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sales representative not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch sales rep: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve sales representative'
            ], 500);
        }
    }

    /**
     * Delete a sales representative
     */
    public function deleteSalesRep($id)
    {
        try {
            $salesRep = Admin::where('id', $id)
                        ->where('role', 'sales_rep')
                        ->firstOrFail();

            $salesRep->delete();

            return response()->json([
                'success' => true,
                'message' => 'Sales representative deleted successfully'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sales representative not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Failed to delete sales rep: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete sales representative'
            ], 500);
        }
    }

    // Regular User Login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token
        ]);
    }

    // Logout (works for both admin and regular users)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}