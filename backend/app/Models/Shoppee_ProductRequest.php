<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Shoppee_ProductRequest extends Model
{
    protected $table = 'shoppee_product_requests';
    protected $fillable = [
        'product_id',
        'quantity',
        'total_products',
        'total_amount',
        'total_pv',
        'status'
    ];
     public function product()
    {
        return $this->belongsTo(\App\Models\Shoppee_Product::class, 'product_id');
    }
}