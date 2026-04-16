<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Shoppee_Member extends Model
{
    use HasFactory;
    protected $table = 'shoppee_members';
    protected $hidden = ['password'];
    protected $fillable = [
        'member_id',
        'fullname',
        'branch_name',
        'branch_pan',
        'dob',
        'gst_no',
        'email',
        'password',
        'mobile_no',
        'address',
        'pin_code',
        'state',
        'city',
        'district',
    ];
    
}