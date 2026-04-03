<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Cartitemecom extends Model
{

    use HasFactory;
    protected $table = 'ecom_cart_items';
    protected $fillable = [
        'member_id',
        'product_id',
        'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
