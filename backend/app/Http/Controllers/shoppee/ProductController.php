<?php

namespace App\Http\Controllers\Shoppee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shoppee_Product;
use App\Models\Shoppee_ProductRequest;
use App\Models\Shoppee_Transaction;
use Illuminate\Support\Facades\DB;




class ProductController extends Controller
{

    // GET PRODUCTS
    public function index(Request $request)
    {
        $query = Shoppee_Product::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        return $query->get();
    }

    // SUBMIT PRODUCT REQUEST
    public function submitRequest(Request $request)
    {
        $product = Shoppee_Product::find($request->product_id);

        if (!$product) {
            return response()->json([
                "message" => "Product not found"
            ]);
        }

        $totalamount = $product->offerprice * $request->quantity;
        $totalpv = $product->pv * $request->quantity;

        $requestData = Shoppee_ProductRequest::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_products' => $request->quantity,
            'total_amount' => $totalamount,
            'total_pv' => $totalpv,
            'status' => 'Pending'
        ]);

        return response()->json([
            "message" => "Product request submitted successfully",
            "data" => $requestData
        ]);
    }

    // GET PRODUCT REQUESTS
    public function getRequests(Request $request)
    {
        $query = Shoppee_ProductRequest::join('shoppee_products', 'shoppee_product_requests.product_id', '=', 'shoppee_products.id')
            ->select(
                'shoppee_product_requests.id',
                'shoppee_products.productname',
                'shoppee_product_requests.created_at as date',
                'shoppee_product_requests.total_products',
                'shoppee_product_requests.total_amount',
                'shoppee_product_requests.total_pv',
                'shoppee_product_requests.status'
            );

        // FILTER BY STATUS
        if ($request->status && $request->status !== 'all') {
            $query->where('shoppee_product_requests.status', $request->status);
        }

        return $query->get();
    }

    // GET DISTINCT CATEGORIES
    public function getCategories()
    {
        return Shoppee_Product::select('id', 'category')->distinct()->get();
    }

    // STOCK REPORT
    public function stockReport()
    {

        $products = DB::table('shoppee_products')
            ->select(
                'shoppee_products.id',
                'shoppee_products.productname',
                'shoppee_products.mrp',
                'shoppee_products.offerprice',
                'shoppee_products.pv'
            )
            ->get();

        $data = [];

        foreach ($products as $product) {

            // Product Received (Approved Requests)
            $received = DB::table('shoppee_product_requests')
                ->where('product_id', $product->id)
                ->where('status', 'Approved')
                ->sum('quantity');

            // Product Used (Delivered Orders)
            $used = DB::table('shoppee_order_items')
                ->where('product_id', $product->id)
                ->sum('quantity');

            $balance = $received - $used;

            $data[] = [
                "id" => $product->id,
                "product" => $product->productname,
                "mrp" => $product->mrp,
                "offerPrice" => $product->offerprice,
                "pv" => $product->pv,
                "productReceived" => $received,
                "productUsed" => $used,
                "productBalance" => $balance,
                "balanceAmount" => $balance * $product->offerprice
            ];

        }

        return response()->json($data);

    }

    // APPROVE PRODUCT REQUEST
    public function approveRequest($id)
    {
        $productRequest = Shoppee_ProductRequest::find($id);

        if (!$productRequest) {
            return response()->json([
                "message" => "Product request not found"
            ], 404);
        }

        if ($productRequest->status === 'Approved') {
            return response()->json([
                "message" => "Product request already approved"
            ], 400);
        }

        $productRequest->status = 'Approved';
        $productRequest->save();

        Shoppee_Transaction::create([
            'ref_id' => $productRequest->id,
            'ref_type' => 'product_request',
            'balance_type' => 'purchase',
            'entry_type' => 'debit',
            'amount' => $productRequest->total_amount,
            'detail' => 'Debited Against Product Request#' . $productRequest->id,
        ]);

        return response()->json([
            "message" => "Product request approved successfully"
        ]);
    }


}