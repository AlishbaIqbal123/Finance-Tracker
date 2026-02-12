<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FinanceController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function login()
    {
        return view('login');
    }

    public function register()
    {
        return view('register');
    }

    public function dashboard()
    {
        return view('dashboard');
    }

    public function analytics()
    {
        return view('analytics');
    }

    public function budget()
    {
        return view('budget');
    }

    public function profile()
    {
        return view('profile');
    }

    public function transactions()
    {
        return view('transactions');
    }

    public function settings()
    {
        return view('settings');
    }

    public function welcome()
    {
        return view('welcome');
    }
}