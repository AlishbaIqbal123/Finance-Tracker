<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::where('user_id', auth()->id())->get();
        
        return response()->json([
            'message' => 'Transactions retrieved successfully',
            'data' => $transactions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        $transaction = Transaction::create(array_merge($request->validated(), ['user_id' => auth()->id()]));
        
        return response()->json([
            'message' => 'Transaction created successfully',
            'data' => $transaction
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        // Ensure the authenticated user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized to view this transaction'
            ], 403);
        }
        
        return response()->json([
            'message' => 'Transaction retrieved successfully',
            'data' => $transaction
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionRequest $request, Transaction $transaction)
    {
        // Ensure the authenticated user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized to update this transaction'
            ], 403);
        }
        
        $transaction->update($request->validated());
        
        return response()->json([
            'message' => 'Transaction updated successfully',
            'data' => $transaction
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        \Log::info('Transaction delete request received', [
            'transaction_id' => $transaction->id,
            'user_id' => auth()->id(),
            'owner_id' => $transaction->user_id
        ]);

        // Ensure the authenticated user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            \Log::warning('Unauthorized delete attempt', [
                'transaction_id' => $transaction->id,
                'user_id' => auth()->id()
            ]);
            return response()->json([
                'message' => 'Unauthorized to delete this transaction'
            ], 403);
        }
        
        $transaction->delete();
        
        \Log::info('Transaction deleted successfully', ['transaction_id' => $transaction->id]);

        return response()->json([
            'message' => 'Transaction deleted successfully'
        ]);
    }

    /**
     * Get transactions with filtering and pagination
     */
    public function filter(Request $request)
    {
        $query = Transaction::where('user_id', auth()->id());
        
        // Apply filters
        if ($request->has('type')) {
            $query->where('type', $request->get('type'));
        }
        
        if ($request->has('category')) {
            $query->byCategory($request->get('category'));
        }
        
        if ($request->has('month')) {
            $query->byMonth($request->get('month'));
        }
        
        if ($request->has('search')) {
            $query->search($request->get('search'));
        }
        
        // Paginate results
        $perPage = $request->get('per_page', 10);
        $transactions = $query->paginate($perPage);
        
        return response()->json([
            'message' => 'Filtered transactions retrieved successfully',
            'data' => $transactions->items(),
            'pagination' => [
                'current_page' => $transactions->currentPage(),
                'per_page' => $transactions->perPage(),
                'total' => $transactions->total(),
                'last_page' => $transactions->lastPage()
            ]
        ]);
    }
}
