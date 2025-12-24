<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all transactions
        $transactions = Transaction::all();
        
        return response()->json([
            'message' => 'Transactions retrieved successfully',
            'data' => $transactions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate and store a new transaction
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'date' => 'required|date'
        ]);

        // Create the transaction in the database
        $transaction = Transaction::create($validated);
        
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
        // Return a specific transaction
        return response()->json([
            'message' => 'Transaction retrieved successfully',
            'data' => $transaction
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        // Validate and update a specific transaction
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric|min:0',
            'type' => 'sometimes|required|in:income,expense',
            'category' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string|max:500',
            'date' => 'sometimes|required|date'
        ]);

        // Update the transaction in the database
        $transaction->update($validated);
        
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
        // Delete a specific transaction
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
        // Handle filtering and pagination
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