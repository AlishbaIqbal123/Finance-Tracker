@props([
    'title' => '',
    'amount' => 0,
    'icon' => 'bi-info-circle',
    'color' => 'primary',
    'description' => '',
    'trend' => null, // 'up' or 'down' or null
    'trendValue' => 0,
    'trendLabel' => '',
    'id' => ''
])

@php
    $colors = [
        'primary' => [
            'bg' => 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            'border' => '#3b82f6',
            'shadow' => '0 4px 12px rgba(59, 130, 246, 0.3)',
        ],
        'success' => [
            'bg' => 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            'border' => '#10b981',
            'shadow' => '0 4px 12px rgba(16, 185, 129, 0.3)',
        ],
        'danger' => [
            'bg' => 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            'border' => '#ef4444',
            'shadow' => '0 4px 12px rgba(239, 68, 68, 0.3)',
        ],
        'warning' => [
            'bg' => 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'border' => '#f59e0b',
            'shadow' => '0 4px 12px rgba(245, 158, 11, 0.3)',
        ],
    ];
    
    $colorData = $colors[$color] ?? $colors['primary'];
    $trendIcon = $trend === 'up' ? 'bi-arrow-up-right' : 'bi-arrow-down-right';
    $trendColor = $trend === 'up' ? 'text-success' : 'text-danger';
@endphp

<div class="card" style="border-left: 4px solid {{ $colorData['border'] }}; box-shadow: 0 2px 8px {{ str_replace('0.3', '0.1', $colorData['shadow']) }};">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
                <p class="text-muted mb-1" style="font-size: 13px; font-weight: 500;">{{ $title }}</p>
                <h2 class="mb-0" id="{{ $id }}" style="color: {{ $colorData['border'] }}; font-weight: 700;">
                    ${{ number_format($amount, 2) }}
                    @if($trend !== null)
                        <small class="ms-2 {{ $trendColor }}" style="font-size: 0.6em;">
                            <i class="bi {{ $trendIcon }} me-1"></i>{{ $trendValue }}%
                        </small>
                    @endif
                </h2>
                @if($trendLabel)
                    <small class="text-muted" style="font-size: 0.7em;">{{ $trendLabel }}</small>
                @endif
            </div>
            <div style="
                width: 48px;
                height: 48px;
                background: {{ $colorData['bg'] }};
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: {{ $colorData['shadow'] }};
            ">
                <i class="bi {{ $icon }}" style="font-size: 24px; color: white;"></i>
            </div>
        </div>
        @if($description)
            <p class="text-muted mb-0" style="font-size: 12px;">
                <i class="bi bi-info-circle me-1"></i>{{ $description }}
            </p>
        @endif
    </div>
</div>
