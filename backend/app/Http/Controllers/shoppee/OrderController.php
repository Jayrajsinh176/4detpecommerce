<?php

namespace App\Http\Controllers\Shoppee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shoppee_Order;
use App\Models\Shoppee_OrderItem;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    // Store Order
    public function store(Request $request)
    {

        $order = Shoppee_Order::create([
            'order_no' => $request->order_no,
            'distributor_id' => $request->distributor_id,
            'order_date' => $request->order_date
        ]);

        foreach ($request->products as $product) {

            Shoppee_OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity']
            ]);

        }

        return response()->json([
            'message' => 'Order created successfully'
        ]);

    }


    // Fetch Order for Branch Sale Page
    public function getOrder($distributorId)
    {

        $order = Shoppee_Order::whereHas('distributor', function ($query) use ($distributorId) {
            $query->where('distributor_id', $distributorId);
        })
            ->with('items.product')
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        $products = [];

        foreach ($order->items as $item) {

            $products[] = [
                'product_name' => $item->product->productname,
                'quantity' => $item->quantity,
                'mrp' => $item->product->mrp,
                'pv' => $item->product->pv,
                'amount' => $item->quantity * $item->product->mrp
            ];
        }

        return response()->json([
            'order_no' => $order->order_no,
            'order_date' => $order->order_date,
            'products' => $products
        ]);

    }

    // Deliver Order
    public function deliverOrder(Request $request)
    {

        foreach ($request->products as $product) {

            DB::table('shoppee_order_items')->insert([
                'order_id' => $request->order_id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'created_at' => now(),
                'updated_at' => now()
            ]);

        }

        return response()->json([
            'message' => 'Product Delivered Successfully'
        ]);

    }


    // Order History
    public function history()
    {
        $orders = Shoppee_Order::with(['distributor', 'items.product'])->latest()->get();

        $data = $orders->map(function ($order) {
            $totalQuantity = 0;
            $totalAmount = 0;

            foreach ($order->items as $item) {
                $qty = $item->quantity;
                $mrp = $item->product ? $item->product->mrp : 0;

                $totalQuantity += $qty;
                $totalAmount += $qty * $mrp;
            }

            return [
                'id' => $order->id,
                'order_no' => $order->order_no,
                'order_date' => $order->order_date,
                'order_type' => $order->order_type,
                'remark' => $order->remark,
                'distributor_name' => $order->distributor ? $order->distributor->name : 'N/A',
                'total_products' => $order->items->count(),
                'total_quantity' => $totalQuantity,
                'total_amount' => $totalAmount,
            ];
        });

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    // View Order Details in Order History
    public function show($id)
    {
        $order = Shoppee_Order::with(['items.product', 'distributor'])->find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        $products = [];

        foreach ($order->items as $item) {
            $products[] = [
                'product_id' => $item->product_id,
                'product_name' => $item->product ? $item->product->productname : 'N/A',
                'quantity' => $item->quantity,
                'mrp' => $item->product ? $item->product->mrp : 0,
                'pv' => $item->product ? $item->product->pv : 0,
                'amount' => $item->quantity * ($item->product ? $item->product->mrp : 0)
            ];
        }

        return response()->json([
            'id' => $order->id,
            'order_no' => $order->order_no,
            'order_date' => $order->order_date,
            'order_type' => $order->order_type,
            'remark' => $order->remark,
            'distributor_name' => $order->distributor ? $order->distributor->name : 'N/A',
            'products' => $products
        ]);
    }

}