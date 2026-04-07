<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HelpTicket extends Model
{
   protected $fillable = [
    'member_id',
    'category',
    'subject',
    'details',
    'image',
    'admin_reply',
    'status'
];


public function member()
{
    return $this->belongsTo(\App\Models\Memberecom::class, 'member_id', 'id');
}
}
