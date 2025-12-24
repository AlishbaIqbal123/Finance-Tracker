<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'amount',
        'type',
        'description',
        'date',
        'payment_method',
        'reference',
        'is_recurring',
        'recurring_period',
        'recurring_end_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
        'is_recurring' => 'boolean',
        'recurring_end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include income transactions.
     */
    public function scopeIncome($query)
    {
        return $query->where('type', 'income');
    }

    /**
     * Scope a query to only include expense transactions.
     */
    public function scopeExpense($query)
    {
        return $query->where('type', 'expense');
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope a query to filter by month.
     */
    public function scopeByMonth($query, $month)
    {
        return $query->whereRaw('DATE_FORMAT(date, "%Y-%m") = ?', [$month]);
    }

    /**
     * Scope a query to search by title or description.
     */
    public function scopeSearch($query, $term)
    {
        return $query->where('title', 'LIKE', "%{$term}%")
                     ->orWhere('description', 'LIKE', "%{$term}%");
    }
}