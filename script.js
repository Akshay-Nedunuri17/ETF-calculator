"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const monthlyInvestmentInput = document.getElementById('monthly-investment');
    const monthlyInvestmentRange = document.getElementById('monthly-investment-range');
    const expectedReturnInput = document.getElementById('expected-return');
    const expectedReturnRange = document.getElementById('expected-return-range');
    const durationInput = document.getElementById('duration');
    const durationRange = document.getElementById('duration-range');
    
    const totalInvestedEl = document.getElementById('total-invested');
    const estReturnsEl = document.getElementById('est-returns');
    const totalValueEl = document.getElementById('total-value');
    
    const resetBtn = document.getElementById('reset-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Chart
    let growthChart;
    const ctx = document.getElementById('growthChart').getContext('2d');

    // State
    let state = {
        monthlyInvestment: 5000,
        expectedReturn: 12,
        duration: 10
    };

    // Initialize
    function init() {
        // Sync inputs from HTML defaults if needed, but state is already set
        updateUI();
        setupEventListeners();
        renderChart();
    }

    // Event Listeners
    function setupEventListeners() {
        // Double binding for inputs and ranges
        syncInputs(monthlyInvestmentInput, monthlyInvestmentRange, 'monthlyInvestment');
        syncInputs(expectedReturnInput, expectedReturnRange, 'expectedReturn');
        syncInputs(durationInput, durationRange, 'duration');

        resetBtn.addEventListener('click', handleReset);
        themeToggle.addEventListener('click', toggleTheme);
    }

    function syncInputs(numInput, rangeInput, key) {
        numInput.addEventListener('input', (e) => {
            let val = parseFloat(e.target.value);
            if (isNaN(val)) val = 0;
            
            // Validation
            if (key === 'expectedReturn' && val > 50) val = 50;
            if (val < 0) val = 0;
            
            state[key] = val;
            
            // Dynamic Slider Scaling: If value exceeds current max, expand the slider
            const currentMax = parseFloat(rangeInput.max);
            if (val > currentMax) {
                rangeInput.max = val;
            } else if (val < currentMax && val > 0) {
                // Optional: contract if much smaller, but usually expanding is enough
            }

            rangeInput.value = val;
            updateUI();
        });

        rangeInput.addEventListener('input', (e) => {
            let val = parseFloat(e.target.value);
            state[key] = val;
            numInput.value = val;
            updateUI();
        });
    }

    function handleReset() {
        state = {
            monthlyInvestment: 5000,
            expectedReturn: 12,
            duration: 10
        };
        
        monthlyInvestmentInput.value = 5000;
        monthlyInvestmentRange.value = 5000;
        expectedReturnInput.value = 12;
        expectedReturnRange.value = 12;
        durationInput.value = 10;
        durationRange.value = 10;
        
        updateUI();
    }

    function toggleTheme() {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
        updateChartTheme();
    }

    // Calculations
    function calculate() {
        const P = state.monthlyInvestment;
        const annualRate = state.expectedReturn;
        const years = state.duration;
        
        const r = (annualRate / 100) / 12;
        const n = years * 12;
        
        // SIP Formula: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
        let totalValue = 0;
        if (r === 0) {
            totalValue = P * n;
        } else {
            totalValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        }
        
        const investedAmount = P * n;
        const returns = totalValue - investedAmount;
        
        return {
            investedAmount: Math.round(investedAmount),
            returns: Math.round(returns),
            totalValue: Math.round(totalValue)
        };
    }

    function getYearlyData() {
        const P = state.monthlyInvestment;
        const annualRate = state.expectedReturn;
        const totalYears = state.duration;
        const r = (annualRate / 100) / 12;
        
        let labels = [];
        let investedData = [];
        let totalValueData = [];
        
        for (let y = 1; y <= totalYears; y++) {
            const n = y * 12;
            let tv = 0;
            if (r === 0) {
                tv = P * n;
            } else {
                tv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            }
            
            labels.push(`Year ${y}`);
            investedData.push(P * n);
            totalValueData.push(Math.round(tv));
        }
        
        return { labels, investedData, totalValueData };
    }

    // UI Updates
    function updateUI() {
        const res = calculate();
        
        totalInvestedEl.textContent = formatINR(res.investedAmount);
        estReturnsEl.textContent = formatINR(res.returns);
        totalValueEl.textContent = formatINR(res.totalValue);
        
        updateChart();
    }

    function formatINR(num) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    }

    // Chart.js
    function renderChart() {
        const data = getYearlyData();
        const isDark = body.classList.contains('dark-mode');
        const textColor = isDark ? '#94a3b8' : '#64748b';
        
        growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Total Value',
                        data: data.totalValueData,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Invested Amount',
                        data: data.investedData,
                        borderColor: '#94a3b8',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0,
                        borderWidth: 2,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            font: { family: 'Inter', weight: '600' }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                        titleColor: isDark ? '#f1f5f9' : '#1e293b',
                        bodyColor: isDark ? '#f1f5f9' : '#1e293b',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += formatINR(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    },
                    y: {
                        grid: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
                        ticks: { 
                            color: textColor,
                            callback: value => '₹' + (value / 100000).toFixed(1) + 'L'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
    }

    function updateChart() {
        if (!growthChart) return;
        const data = getYearlyData();
        growthChart.data.labels = data.labels;
        growthChart.data.datasets[0].data = data.totalValueData;
        growthChart.data.datasets[1].data = data.investedData;
        growthChart.update('none'); // Update without animation for smoother range sliding
    }

    function updateChartTheme() {
        if (!growthChart) return;
        const isDark = body.classList.contains('dark-mode');
        const textColor = isDark ? '#94a3b8' : '#64748b';
        
        growthChart.options.plugins.legend.labels.color = textColor;
        growthChart.options.plugins.tooltip.backgroundColor = isDark ? '#1e293b' : '#ffffff';
        growthChart.options.plugins.tooltip.titleColor = isDark ? '#f1f5f9' : '#1e293b';
        growthChart.options.plugins.tooltip.bodyColor = isDark ? '#f1f5f9' : '#1e293b';
        growthChart.options.plugins.tooltip.borderColor = isDark ? '#334155' : '#e2e8f0';
        growthChart.options.scales.x.ticks.color = textColor;
        growthChart.options.scales.y.ticks.color = textColor;
        growthChart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        
        growthChart.update();
    }

    // Local Storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.replace('light-mode', 'dark-mode');
    }

    init();
});
