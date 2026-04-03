<?php

namespace App\Http\Controllers\Api;
use App\Models\Order;
use App\Models\Memberecom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required',
            'product_name' => 'required',
            'quantity' => 'required',
            'total_amount' => 'required'
        ]);

        $order = Order::create([
            'member_id' => $request->member_id,
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'total_amount' => $request->total_amount,
            'image' => $request->image // ✅ image saved
        ]);

        return response()->json([
            'message' => 'Order placed successfully',
            'data' => $order
        ]);
    }
    public function index()
    {
        $orders = Order::all()->map(function ($order) {
            $member = Memberecom::find($order->member_id);

            return [
                'product_name' => $order->product_name,
                'quantity' => $order->quantity,
                'total_amount' => $order->total_amount,
                'image' => $order->image,
                'member_name' => $member ? $member->fullname : 'Guest' // ✅ dynamic name
            ];
        });

        return response()->json($orders);
    }

   public function userOrders($member_id)
{
    $orders = Order::where('member_id', $member_id)->get()->map(function ($order) {
        $member = Memberecom::find($order->member_id);

        return [
            'product_name' => $order->product_name,
            'quantity' => $order->quantity,
            'total_amount' => $order->total_amount,

            // ✅ FINAL IMAGE FIX
            'image' => str_starts_with($order->image, 'http')
                ? $order->image
                : asset('storage/' . $order->image),

            'member_name' => $member ? $member->fullname : 'Guest',
            'address' => $member ? $member->address : '',
            'mobile' => $member ? $member->mobile_no : ''
        ];
    });

    return response()->json($orders);
}
    public function latestOrder($member_id)
    {
        $order = Order::where('member_id', $member_id)
            ->latest()
            ->first();

        if ($order && $order->image) {
            $order->image = asset('storage/' . $order->image);
        }

        return response()->json($order);
    }
}
