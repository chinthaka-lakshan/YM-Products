<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Models\ShopModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ShopController extends Controller
{
    /**
     * Display a listing of all shops.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $shops = Shop::all();
            return response()->json($shops);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch shops: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch shops',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created shop in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'shop_name' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create new shop
            $shop = Shop::create([
                'shop_name' => $request->shop_name,
                'location' => $request->location,
                'contact' => $request->contact,
            ]);

            return response()->json([
                'message' => 'Shop created successfully',
                'shop' => $shop
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Failed to create shop: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create shop',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified shop.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $shop = Shop::findOrFail($id);
            return response()->json($shop);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Shop not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch shop: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch shop',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified shop in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'shop_name' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find the shop
            $shop = Shop::findOrFail($id);
            
            // Update shop details
            $shop->update([
                'shop_name' => $request->shop_name,
                'location' => $request->location,
                'contact' => $request->contact,
            ]);

            return response()->json([
                'message' => 'Shop updated successfully',
                'shop' => $shop
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Shop not found'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Failed to update shop: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update shop',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified shop from the database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $shop = Shop::findOrFail($id);
            $shop->delete();

            return response()->json([
                'message' => 'Shop deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Shop not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Failed to delete shop: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete shop',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}