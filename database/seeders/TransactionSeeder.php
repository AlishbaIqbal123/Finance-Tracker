<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user
        $user = User::first();
        if (!$user) {
            echo "No user found. Please create a user first.\n";
            return;
        }
        
        // Get category IDs
        $salaryCategory = Category::where('user_id', $user->id)->where('name', 'Salary')->where('type', 'income')->first();
        $foodCategory = Category::where('user_id', $user->id)->where('name', 'Food')->where('type', 'expense')->first();
        $billsCategory = Category::where('user_id', $user->id)->where('name', 'Bills')->where('type', 'expense')->first();
        $freelanceCategory = Category::where('user_id', $user->id)->where('name', 'Freelance')->where('type', 'income')->first();
        
        if (!$salaryCategory || !$foodCategory || !$billsCategory || !$freelanceCategory) {
            echo "Required categories not found. Please run CategorySeeder first.\n";
            return;
        }
        
        Transaction::insert([
            [
                'user_id' => $user->id,
                'title' => 'Salary',
                'amount' => 5000.00,
                'type' => 'income',
                'category_id' => $salaryCategory->id,
                'description' => 'Monthly salary',
                'date' => '2025-11-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Groceries',
                'amount' => 150.75,
                'type' => 'expense',
                'category_id' => $foodCategory->id,
                'description' => 'Weekly grocery shopping',
                'date' => '2025-11-05',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Electricity Bill',
                'amount' => 85.50,
                'type' => 'expense',
                'category_id' => $billsCategory->id,
                'description' => 'Monthly electricity bill',
                'date' => '2025-11-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Freelance Work',
                'amount' => 1200.00,
                'type' => 'income',
                'category_id' => $freelanceCategory->id,
                'description' => 'Website development project',
                'date' => '2025-11-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Dinner Out',
                'amount' => 65.25,
                'type' => 'expense',
                'category_id' => $foodCategory->id,
                'description' => 'Dinner at restaurant',
                'date' => '2025-11-20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}