<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HelpTicket;

class HelpTicketController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'member_id' => 'required|exists:ecom_members,id',
        'category' => 'required',
        'subject' => 'required',
        'details' => 'required',
        'image' => 'nullable|image|max:2048',
    ]);

    $imagePath = null;

    if ($request->hasFile('image')) {

        $file = $request->file('image');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $destinationPath = public_path('tickets');

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        $file->move($destinationPath, $fileName);

        $imagePath = 'tickets/' . $fileName;
    }

    $ticket = HelpTicket::create([
        'member_id' => $request->member_id,
        'category' => $request->category,
        'subject' => $request->subject,
        'details' => $request->details,
        'image' => $imagePath,
        'status' => 'pending'
    ]);

    return response()->json([
        'message' => 'Ticket submitted successfully',
        'data' => $ticket
    ]);
}

    public function getTickets($member_id)
    {
        return HelpTicket::with('member')
            ->where('member_id', $member_id)
            ->latest()
            ->get();
    }
}