<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class CategorySeeder extends Seeder
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
        
        $categories = [
            // Income categories
            ['user_id' => $user->id, 'name' => 'Salary', 'type' => 'income', 'color' => '#10b981', 'icon' => 'cash'],
            ['user_id' => $user->id, 'name' => 'Freelance', 'type' => 'income', 'color' => '#3b82f6', 'icon' => 'laptop'],
            ['user_id' => $user->id, 'name' => 'Investment', 'type' => 'income', 'color' => '#8b5cf6', 'icon' => 'graph-up'],
            ['user_id' => $user->id, 'name' => 'Business', 'type' => 'income', 'color' => '#f59e0b', 'icon' => 'briefcase'],
            ['user_id' => $user->id, 'name' => 'Other', 'type' => 'income', 'color' => '#64748b', 'icon' => 'question-circle'],
            
            // Expense categories
            ['user_id' => $user->id, 'name' => 'Food', 'type' => 'expense', 'color' => '#ef4444', 'icon' => 'cart'],
            ['user_id' => $user->id, 'name' => 'Transportation', 'type' => 'expense', 'color' => '#3b82f6', 'icon' => 'car'],
            ['user_id' => $user->id, 'name' => 'Shopping', 'type' => 'expense', 'color' => '#f59e0b', 'icon' => 'bag'],
            ['user_id' => $user->id, 'name' => 'Bills', 'type' => 'expense', 'color' => '#10b981', 'icon' => 'receipt'],
            ['user_id' => $user->id, 'name' => 'Entertainment', 'type' => 'expense', 'color' => '#8b5cf6', 'icon' => 'film'],
            ['user_id' => $user->id, 'name' => 'Healthcare', 'type' => 'expense', 'color' => '#ec4899', 'icon' => 'heart'],
            ['user_id' => $user->id, 'name' => 'Education', 'type' => 'expense', 'color' => '#06b6d4', 'icon' => 'book'],
            ['user_id' => $user->id, 'name' => 'Other', 'type' => 'expense', 'color' => '#64748b', 'icon' => 'question-circle'],
        ];

        foreach ($categories as $categoryData) {
            Category::firstOrCreate(
                ['user_id' => $user->id, 'name' => $categoryData['name'], 'type' => $categoryData['type']],
                $categoryData
            );
        }
    }
}