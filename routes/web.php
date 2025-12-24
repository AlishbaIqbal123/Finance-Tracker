<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FinanceController;

Route::get('/', [FinanceController::class, 'index']);

Route::get('/login', [FinanceController::class, 'login'])->name('login');
Route::get('/register', [FinanceController::class, 'register'])->name('register');

Route::get('/dashboard', [FinanceController::class, 'dashboard']);

Route::get('/analytics', [FinanceController::class, 'analytics']);

Route::get('/budget', [FinanceController::class, 'budget']);

Route::get('/profile', [FinanceController::class, 'profile']);

Route::get('/transactions', [FinanceController::class, 'transactions']);

Route::get('/settings', [FinanceController::class, 'settings']);

Route::get('/welcome', [FinanceController::class, 'welcome']);

Route::post('/logout', function () {
    auth()->logout();
    return redirect('/login');
})->name('logout');