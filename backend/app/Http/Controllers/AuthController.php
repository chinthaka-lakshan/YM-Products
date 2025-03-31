<!-- use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    // Admin Registration (Only for Admins)
    public function registerRep(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'sales_rep',
        ]);

        return response()->json(['message' => 'Sales Representative registered successfully']);
    }

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(['email' => ['The provided credentials are incorrect.']]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
} -->
<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Admin Login (Predefined Credentials)
    public function adminLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Check against predefined admin credentials
        if ($credentials['email'] === 'admin@ym.com' && $credentials['password'] === 'admin123') {
            $token = base64_encode('admin_token'); // Dummy token
            return response()->json(['success' => true, 'token' => $token]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    // Register Rep
    public function registerRep(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'rep',
        ]);

        return response()->json(['success' => true, 'message' => 'Rep registered successfully']);
    }

    // Rep Login
    public function repLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('rep_token')->plainTextToken;
            return response()->json(['success' => true, 'token' => $token]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }
}
