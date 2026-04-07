<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ✅ COMMON FORMAT FUNCTION (BEST PRACTICE)
    private function formatProduct($item)
    {
        // ✅ IMAGE FIX (fallback)
        $item->image = $item->image
            ? asset('storage/' . $item->image)
            : asset('default-product.png');

        // ✅ FINAL PRICE LOGIC
        $finalPrice = $item->offer_price ?? $item->price;

        // ✅ INR FORMAT
        $item->price = number_format($item->price, 2);

        $item->offer_price = $item->offer_price
            ?  number_format($item->offer_price, 2)
            : null;

        $item->final_price = '₹' . number_format($finalPrice, 2);

        return $item;
    }

    // ✅ ALL PRODUCTS
    public function allProducts()
    {
        $products = Product::select(
            'id',
            'brand',
            'name',
            'price',
            'offer_price',
            'discount_percentage',
            'description',
            'image'
        )->get();

        $products->transform(fn ($item) => $this->formatProduct($item));

        return response()->json($products);
    }

    // ✅ VIRAL PRODUCTS
    public function viralProducts()
    {
        $products = Product::where('is_viral', 1)
            ->select(
                'id',
                'brand',
                'name',
                'price',
                'offer_price',
                'discount_percentage',
                'description',
                'image'
            )
            ->get();

        $products->transform(fn ($item) => $this->formatProduct($item));

        return response()->json($products);
    }

    // ✅ SINGLE PRODUCT
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return $this->formatProduct($product);
    }

    // ✅ PRODUCTS BY CATEGORY
    public function productsByCategory($id)
    {
        $products = Product::with('category')
            ->where('category_id', $id)
            ->get();

        $products->transform(function ($item) {
            $item = $this->formatProduct($item);
            $item->category_name = $item->category->name ?? null;
            return $item;
        });

        return response()->json($products);
    }

    // ✅ CATEGORIES
    public function categories()
    {
        $categories = Category::select('id', 'name', 'image')->get();

        $categories->transform(function ($item) {
            $item->image = $item->image
                ? asset('storage/' . $item->image)
                : asset('default-product.png');

            return $item;
        });

        return response()->json($categories);
    }
}