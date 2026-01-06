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
            // Jan 2026
            [
                'user_id' => $user->id,
                'title' => 'Monthly Salary',
                'amount' => 5500.00,
                'type' => 'income',
                'category_id' => $salaryCategory->id,
                'description' => 'Jan Salary',
                'date' => '2026-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Rent',
                'amount' => 1500.00,
                'type' => 'expense',
                'category_id' => $billsCategory->id,
                'description' => 'Monthly rent',
                'date' => '2026-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Groceries',
                'amount' => 450.00,
                'type' => 'expense',
                'category_id' => $foodCategory->id,
                'description' => 'Weekly groceries',
                'date' => '2026-01-05',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Feb 2026
            [
                'user_id' => $user->id,
                'title' => 'Salary Feb',
                'amount' => 5500.00,
                'type' => 'income',
                'category_id' => $salaryCategory->id,
                'description' => 'Feb Salary',
                'date' => '2026-02-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Fuel',
                'amount' => 300.00,
                'type' => 'expense',
                'category_id' => $billsCategory->id, // Assuming Bills for now if Transportation not fetched
                'description' => 'Gas refill',
                'date' => '2026-02-05',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Dinner',
                'amount' => 120.00,
                'type' => 'expense',
                'category_id' => $foodCategory->id,
                'description' => 'Restaurant',
                'date' => '2026-02-12',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Dec 2025
             [
                'user_id' => $user->id,
                'title' => 'Dec Salary',
                'amount' => 5000.00,
                'type' => 'income',
                'category_id' => $salaryCategory->id,
                'description' => 'Bonus included',
                'date' => '2025-12-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Rent Dec',
                'amount' => 1500.00,
                'type' => 'expense',
                'category_id' => $billsCategory->id,
                'description' => 'Dec rent',
                'date' => '2025-12-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}