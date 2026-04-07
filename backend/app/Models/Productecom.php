<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productecom extends Model
{
    use HasFactory;
    protected $table = 'ecom_products';

    protected $fillable = [
        'brand',
        'name',
        'price',
        'offer_price',
        'discount_percentage',
        'description',
        'image',
        'is_viral',
        'category_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }

     protected static function boot()
    {
        parent::boot();

        static::saving(function ($product) {

            // ✅ KEEP OLD IMAGE
            if (empty($product->image)) {
                $product->image = $product->getOriginal('image');
            }

            // ✅ FIX: FORCE FLOAT CALCULATION
            if (!empty($product->offer_price) && !empty($product->price)) {

                $price = (float) $product->price;
                $offer = (float) $product->offer_price;

                if ($price > 0 && $offer < $price) {
                    $product->discount_percentage = round(
                        (($price - $offer) / $price) * 100
                    );
                } else {
                    $product->discount_percentage = 0;
                }

            } else {
                $product->discount_percentage = 0;
            }
        });
    }

}
