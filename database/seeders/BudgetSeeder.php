<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
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
        $foodCategory = Category::where('user_id', $user->id)->where('name', 'Food')->where('type', 'expense')->first();
        $transportationCategory = Category::where('user_id', $user->id)->where('name', 'Transportation')->where('type', 'expense')->first();
        $entertainmentCategory = Category::where('user_id', $user->id)->where('name', 'Entertainment')->where('type', 'expense')->first();
        $shoppingCategory = Category::where('user_id', $user->id)->where('name', 'Shopping')->where('type', 'expense')->first();
        
        if (!$foodCategory || !$transportationCategory || !$entertainmentCategory || !$shoppingCategory) {
            echo "Required categories not found. Please run CategorySeeder first.\n";
            return;
        }
        
        Budget::insert([
            [
                'user_id' => $user->id,
                'category_id' => $foodCategory->id,
                'name' => 'Food Budget',
                'amount' => 600.00,
                'period' => 'monthly',
                'start_date' => now()->startOfMonth(),
                'end_date' => now()->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $transportationCategory->id,
                'name' => 'Transportation Budget',
                'amount' => 300.00,
                'period' => 'monthly',
                'start_date' => now()->startOfMonth(),
                'end_date' => now()->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $entertainmentCategory->id,
                'name' => 'Entertainment Budget',
                'amount' => 200.00,
                'period' => 'monthly',
                'start_date' => now()->startOfMonth(),
                'end_date' => now()->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $shoppingCategory->id,
                'name' => 'Shopping Budget',
                'amount' => 400.00,
                'period' => 'monthly',
                'start_date' => now()->startOfMonth(),
                'end_date' => now()->endOfMonth(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}