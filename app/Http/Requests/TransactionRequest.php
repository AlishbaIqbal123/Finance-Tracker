<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'date' => 'required|date'
        ];

        // For update requests, make fields optional
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['title'] = 'sometimes|required|string|max:255';
            $rules['amount'] = 'sometimes|required|numeric|min:0';
            $rules['type'] = 'sometimes|required|in:income,expense';
            $rules['category'] = 'sometimes|required|string|max:100';
            $rules['date'] = 'sometimes|required|date';
        }

        return $rules;
    }
}
