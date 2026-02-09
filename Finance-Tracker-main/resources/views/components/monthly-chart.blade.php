@props(['id' => 'monthlyChart', 'title' => 'Monthly Report', 'subtitle' => 'Income vs Expenses comparison'])

<div class="card">
    <div class="card-header">
        {{ $title }}
        @if(isset($subtitle))
            <div class="text-muted" style="font-size: 12px; font-weight: normal;">{{ $subtitle }}</div>
        @endif
    </div>
    <div class="card-body">
        <div id="{{ $id }}" style="height: 300px; position: relative;">
            <!-- Chart will be rendered here by JavaScript -->
            <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</div>


