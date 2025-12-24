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
        $transactions = Transaction::all();
        
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
        $transaction = Transaction::create($request->validated());
        
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
        $transaction->delete();
        
        return response()->json([
            'message' => 'Transaction deleted successfully'
        ]);
    }

    /**
     * Get transactions with filtering and pagination
     */
    public function filter(Request $request)
    {
        $query = Transaction::query();
        
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
