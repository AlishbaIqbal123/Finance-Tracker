<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\AuthController;

Route::get('/', [FinanceController::class, 'index']);

Route::get('/login', [FinanceController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [FinanceController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', [FinanceController::class, 'dashboard']);

Route::get('/analytics', [FinanceController::class, 'analytics']);

Route::get('/budget', [FinanceController::class, 'budget']);

Route::get('/profile', [FinanceController::class, 'profile']);

Route::get('/transactions', [FinanceController::class, 'transactions']);

Route::get('/settings', [FinanceController::class, 'settings']);

Route::get('/welcome', [FinanceController::class, 'welcome']);

// API routes for transactions (Stateful via Web session)
Route::middleware('auth')->prefix('api')->group(function () {
    Route::get('/transactions', [\App\Http\Controllers\Api\TransactionController::class, 'index']);
    Route::post('/transactions', [\App\Http\Controllers\Api\TransactionController::class, 'store']);
    Route::get('/transactions/filter', [\App\Http\Controllers\Api\TransactionController::class, 'filter']);
    Route::get('/transactions/{transaction}', [\App\Http\Controllers\Api\TransactionController::class, 'show']);
    Route::put('/transactions/{transaction}', [\App\Http\Controllers\Api\TransactionController::class, 'update']);
    Route::delete('/transactions/{transaction}', [\App\Http\Controllers\Api\TransactionController::class, 'destroy']);
});
