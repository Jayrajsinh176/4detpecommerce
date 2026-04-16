<?php
namespace App\Http\Controllers\Shoppee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shoppee_BalanceRequest;
use App\Models\Shoppee_Transaction;
class BalanceRequestController extends Controller
{
    // Submit a new balance request
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'amount' => 'required|numeric|min:500',
            'mode_of_payment' => 'required',
            'transaction_no' => 'nullable',
            'payment_slip' => 'nullable|image|max:2048',
        ]);
        $filePath = null;
        if ($request->hasFile('payment_slip')) {
            $filePath = $request->file('payment_slip')
                ->store('payment_slips', 'public');
        }
        Shoppee_BalanceRequest::create([
            'type' => $request->type,
            'amount' => $request->amount,
            'mode_of_payment' => $request->mode_of_payment,
            'transaction_no' => $request->transaction_no,
            'payment_slip' => $filePath,
            'status' => 'pending',
        ]);
        return response()->json([
            'message' => 'Request submitted successfully'
        ]);
    }
    // Balance request history Data
    public function history(Request $request)
    {
        $query = Shoppee_BalanceRequest::query();
        if ($request->type && $request->type != 'all') {
            $query->where('type', $request->type);
        }
        $data = $query->latest()->get();
        return response()->json($data);
    }
    // Approve a balance request Data
    public function approveRequest($id)
    {
        $requestData = Shoppee_BalanceRequest::find($id);
        if (!$requestData) {
            return response()->json([
                'message' => 'Balance request not found'
            ], 404);
        }
        if ($requestData->status === 'approved') {
            return response()->json([
                'message' => 'Balance request already approved'
            ], 400);
        }
        $requestData->status = 'approved';
        $requestData->save();
        Shoppee_Transaction::create([
            'ref_id' => $requestData->id,
            'ref_type' => 'balance_request',
            'balance_type' => $requestData->type,
            'entry_type' => 'credit',
            'amount' => $requestData->amount,
            'detail' => 'Credited Against ' . ucfirst($requestData->type) . ' Request#' . $requestData->id,
        ]);
        return response()->json([
            'message' => 'Balance request approved successfully'
        ]);
    }
    // Get all transactions with running balance calculation
    public function transactions()
    {
        $transactionsRaw = Shoppee_Transaction::orderBy('created_at', 'asc')->get();
        $totalCredit = $transactionsRaw->where('entry_type', 'credit')->sum('amount');
        $totalDebit = $transactionsRaw->where('entry_type', 'debit')->sum('amount');
        $runningBalance = 0;
        $transactions = $transactionsRaw->map(function ($item) use (&$runningBalance) {
            if ($item->entry_type === 'credit') {
                $runningBalance += $item->amount;
            } else {
                $runningBalance -= $item->amount;
            }
            return [
                'id' => $item->id,
                'date' => $item->created_at->format('d-m-Y'),
                'detail' => $item->detail,
                'credit_amount' => $item->entry_type === 'credit' ? $item->amount : null,
                'debit_amount' => $item->entry_type === 'debit' ? $item->amount : null,
                'balance' => $runningBalance,
            ];
        })->reverse()->values();
        return response()->json([
            'balance' => $totalCredit - $totalDebit,
            'total_credit' => $totalCredit,
            'total_debit' => $totalDebit,
            'transactions' => $transactions,
        ]);
    }
}