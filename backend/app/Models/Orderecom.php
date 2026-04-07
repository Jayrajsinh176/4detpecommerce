<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orderecom extends Model
{
    use HasFactory;
    protected $table = 'ecom_orders';

    protected $fillable = [
        'member_id',
        'product_name',
        'quantity',
        'total_amount',
        'image',
        'status',
        'dispatched_at',
        'delivered_at',

    ];

    // 🔥 Order → Items
    public function items()
    {
        return $this->hasMany(\App\Models\Cartitemecom::class, 'member_id', 'member_id');
    }

    // 🔥 Order → User
    public function member()
    {
        return $this->belongsTo(\App\Models\Memberecom::class, 'member_id');
    }
    protected static function boot()
    {
        parent::boot();

        static::updating(function ($order) {
            if ($order->status === 'dispatched' && !$order->dispatched_at) {
                $order->dispatched_at = now();
            }

            if ($order->status === 'delivered' && !$order->delivered_at) {
                $order->delivered_at = now();
            }
        });
    }
}
