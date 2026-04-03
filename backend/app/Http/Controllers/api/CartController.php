<?php

namespace App\Http\Controllers\Api;

use App\Models\Cartitemecom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        try {
            $request->validate([
                'member_id' => 'required',
                'product_id' => 'required',
                'quantity' => 'required|integer|min:1'
            ]);

            $existing = Cartitemecom::where('member_id', $request->member_id)
                ->where('product_id', $request->product_id)
                ->first();

            if ($existing) {
                $existing->quantity += $request->quantity;
                $existing->save();
            } else {
                Cartitemecom::create([
                    'member_id' => $request->member_id,
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity
                ]);
            }

            return response()->json([
                'message' => 'Added to cart successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getCart($member_id)
    {
        $cartItems = Cartitemecom::with('product')->where('member_id', $member_id)->get();

        // ✅ FIX IMAGE HERE
        $cartItems->map(function ($item) {
            if ($item->product && $item->product->image) {
                $item->product->image = asset('storage/' . $item->product->image);
            }
            return $item;
        });

        return response()->json($cartItems);
    }

    public function updateQuantity(Request $request, $id)
    {
        $item = Cartitemecom::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->quantity = $request->quantity;
        $item->save();

        return response()->json(['message' => 'Quantity updated']);
    }

    public function clearCart($member_id)
    {
        Cartitemecom::where('member_id', $member_id)->delete();
    }

    public function remove($id)
    {
        $item = Cartitemecom::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
