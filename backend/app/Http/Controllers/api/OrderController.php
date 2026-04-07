<?php

namespace App\Http\Controllers\Api;

use App\Models\Orderecom;
use App\Models\Memberecom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // 🔥 CREATE ORDER
    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required',
            'product_name' => 'required',
            'quantity' => 'required|numeric',
            'total_amount' => 'required|numeric'
        ]);

        $order = Orderecom::create([
            'member_id' => $request->member_id,
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'total_amount' => $request->total_amount,
            'image' => $request->image,
            'status' => 'pending' // ✅ IMPORTANT
        ]);

        return response()->json([
            'message' => 'Order placed successfully',
            'data' => $order
        ]);
    }

    // 🔥 ALL ORDERS (ADMIN)
    public function index()
    {
        $orders = Orderecom::with('member')->get()->map(function ($order) {
            return [
                'product_name' => $order->product_name,
                'quantity' => $order->quantity,
                'total_amount' => $order->total_amount,
                'status' => $order->status, // ✅ added
                'image' => $this->formatImage($order->image),
                'member_name' => $order->member->fullname ?? 'Guest'
            ];
        });

        return response()->json($orders);
    }

    // 🔥 USER ORDERS
    public function userOrders($member_id)
    {
        $orders = Orderecom::with('member')
            ->where('member_id', $member_id)
            ->get()
            ->map(function ($order) {
                return [
                    'product_name' => $order->product_name,
                    'quantity' => $order->quantity,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status, // ✅ IMPORTANT

                    'image' => $this->formatImage($order->image),

                    'member_name' => $order->member->fullname ?? 'Guest',
                    'address' => $order->member->address ?? '',
                    'mobile' => $order->member->mobile_no ?? '',

                    // 🔥 TRACKING
                    'dispatched_at' => $order->dispatched_at,
                    'delivered_at' => $order->delivered_at,
                    'created_at' => $order->created_at,
                ];
            });

        return response()->json($orders);
    }

    // 🔥 LATEST ORDER
    public function latestOrder($member_id)
    {
        $order = Orderecom::where('member_id', $member_id)
            ->latest()
            ->first();

        if ($order) {
            $order->image = $this->formatImage($order->image);
        }

        return response()->json($order);
    }

    // 🔥 IMAGE HELPER (BEST PRACTICE)
    private function formatImage($image)
{
    if (!$image) {
        return 'https://via.placeholder.com/150'; // ✅ fallback image
    }

    return str_starts_with($image, 'http')
        ? $image
        : asset('storage/' . $image);
}
}