<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Shoppee_Order extends Model
{
    use HasFactory;
    protected $table = 'shoppee_orders';
    protected $fillable = [
        'order_no',
        'distributor_id',
        'order_date',
        'order_type',
        'remark'
    ];
    public function distributor()
    {
        return $this->belongsTo(Shoppee_Distributor::class);
    }
    public function items()
    {
        return $this->hasMany(Shoppee_OrderItem::class);
    }
}