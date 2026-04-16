<?php
namespace App\Http\Controllers\Shoppee;
use App\Http\Controllers\Controller;
use App\Models\Shoppee_Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class MemberController extends Controller
{
    // SIGNUP
    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|unique:shoppee_members',
            'fullname' => 'required',
            'branch_name' => 'required',
            'dob' => 'required|date',
            'gst_no' => 'required',
            'email' => 'required|email|unique:shoppee_members',
            'password' => 'required|min:6',
            'mobile_no' => 'required',
            'address' => 'required',
            'pin_code' => 'required',
            'state' => 'required',
            'city' => 'required',
            'district' => 'required',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        $member = Shoppee_Member::create($validated);
        return response()->json([
            'message' => 'Signup successful',
            'data' => $member
        ], 201);
    }
    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'member_id' => 'required',
            'password' => 'required'
        ]);
        $member = Shoppee_Member::where('member_id', $request->member_id)->first();
        if (!$member) {
            return response()->json([
                'message' => 'Invalid Member ID'
            ], 401);
        }
        if (!Hash::check($request->password, $member->password)) {
            return response()->json([
                'message' => 'Invalid Password'
            ], 401);
        }
        return response()->json([
            'message' => 'Login successful',
            'data' => $member
        ], 200);
    }
    // UPDATE PROFILE
    public function updateProfile(Request $request, $id)
{
    $member = Shoppee_Member::find($id);
    if (!$member) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    $member->update([
        'address' => $request->address,
        'state' => $request->state,
        'city' => $request->city,
        'district' => $request->district,
        'pin_code' => $request->pin_code,
    ]);
    return response()->json([
        'message' => 'Profile updated successfully',
        'data' => $member
    ]);
}
}