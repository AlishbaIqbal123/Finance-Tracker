<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Transaction API routes
Route::prefix('transactions')->group(function () {
    Route::get('/', [TransactionController::class, 'index']);           // Get all transactions
    Route::post('/', [TransactionController::class, 'store']);          // Create a new transaction
    Route::get('/filter', [TransactionController::class, 'filter']);    // Filter transactions
    Route::get('/{transaction}', [TransactionController::class, 'show']);        // Get a specific transaction
    Route::put('/{transaction}', [TransactionController::class, 'update']);      // Update a specific transaction
    Route::delete('/{transaction}', [TransactionController::class, 'destroy']);  // Delete a specific transaction
});