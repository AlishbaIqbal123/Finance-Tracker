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
