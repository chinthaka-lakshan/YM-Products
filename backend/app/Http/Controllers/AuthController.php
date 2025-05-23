<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\SalesRepCredentials;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use App\Models\PasswordResetOtp;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{

    // ... your existing methods ...
    
    /**
     * Send password reset link
     */
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            $otp = rand(100000, 999999);
            $email = strtolower(trim($request->email)); // Normalize email
            
            \DB::beginTransaction();
            
            // Delete any existing OTPs for this email
            PasswordResetOtp::where('email', $email)->delete();
            
            // Store new OTP
            $otpRecord = PasswordResetOtp::create([
                'email' => $email,
                'otp' => (string)$otp, // Store as string
                'created_at' => now()
            ]);
            
            \DB::commit();
            
            \Log::info("OTP stored", [
                'email' => $email,
                'otp' => $otp,
                'db_id' => $otpRecord->id
            ]);
            
            Mail::to($email)->send(new SendOtpMail($otp));
            
            return response()->json([
                'message' => 'OTP sent',
                'debug' => [
                    'stored_email' => $email,
                    'stored_otp' => $otp
                ]
            ]);
            
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error("OTP send failed: " . $e->getMessage());
            return response()->json([
                'error' => 'Failed to process OTP',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6'
        ]);

        $otpRecord = PasswordResetOtp::where('email', $request->email)
                                    ->where('otp', $request->otp)
                                    ->first();

        if (!$otpRecord) {
            return response()->json([
                'error' => 'Invalid OTP',
                'debug' => [
                    'received_email' => $request->email,
                    'received_otp' => $request->otp,
                    'db_otp' => PasswordResetOtp::where('email', $request->email)->value('otp')
                ]
            ], 400);
        }

        // Now this will work because created_at is Carbon instance
        if ($otpRecord->created_at->addMinutes(15)->isPast()) {
            return response()->json([
                'error' => 'OTP expired',
                'generated_at' => $otpRecord->created_at->format('Y-m-d H:i:s'),
                'expired_at' => $otpRecord->created_at->addMinutes(15)->format('Y-m-d H:i:s'),
                'current_time' => now()->format('Y-m-d H:i:s')
            ], 400);
        }

        return response()->json([
            'message' => 'OTP verified successfully',
            'valid_until' => $otpRecord->created_at->addMinutes(15)->format('Y-m-d H:i:s')
        ]);
    }

public function resetPasswordWithOtp(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'otp' => 'required|digits:6',
        'password' => 'required|confirmed|min:6'
    ]);

    try {
        // 1. Verify OTP exists first
        $otpRecord = PasswordResetOtp::where('email', $validated['email'])
                                    ->where('otp', $validated['otp'])
                                    ->first();

        if (!$otpRecord) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        // 2. Check OTP expiration (15 minutes)
        if ($otpRecord->created_at->addMinutes(15)->isPast()) {
            return response()->json(['error' => 'OTP expired'], 400);
        }

        // 3. Find admin (using your Admin model)
        $admin = Admin::where('email', $validated['email'])->first();

        if (!$admin) {
            return response()->json([
                'error' => 'Admin account not found',
                'suggestion' => 'Please contact system administrator'
            ], 404);
        }

        // 4. Update admin password
        $admin->password = Hash::make($validated['password']);
        $admin->save();

        // 5. Clean up OTP
        PasswordResetOtp::where('email', $validated['email'])->delete();

        return response()->json([
            'message' => 'Admin password reset successfully',
            'admin' => [
                'id' => $admin->id,
                'email' => $admin->email
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Password reset failed',
            'message' => $e->getMessage()
        ], 500);
    }
}


        // Admin Registration (Only for Admins)
public function registerRep(Request $request)
{
    try {
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

        // Queue the email
        Mail::to($validated['email'])
            ->queue(new SalesRepCredentials(
                $validated['name'],
                $validated['email'],
                $validated['password'] // Sending plain password only for initial setup
            ));

        return response()->json([
            'success' => true,
            'message' => 'Sales rep created successfully',
            'data' => $admin,
            'email_sent' => true
        ], 201);

    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        \Log::error('Registration failed: '.$e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Registration completed but email failed to send',
            'error' => env('APP_DEBUG') ? $e->getMessage() : null
        ], 201); // Still return 201 as account was created
    }
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