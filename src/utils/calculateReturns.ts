
export interface CalculationResult {
    year: number;
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
    inflationAdjustedValue?: number;
}

export interface CalculationInput {
    initialInvestment: number;
    monthlyInvestment: number;
    annualReturnRate: number;
    years: number;
    inflationRate?: number;
    stepUpPercentage?: number;
    expenseRatio?: number;
}

export const calculateReturns = (input: CalculationInput): CalculationResult[] => {
    const {
        initialInvestment,
        monthlyInvestment,
        annualReturnRate,
        years,
        inflationRate = 0,
        stepUpPercentage = 0,
        expenseRatio = 0,
    } = input;

    const results: CalculationResult[] = [];
    let currentTotalValue = initialInvestment;
    let currentInvestedAmount = initialInvestment;
    // Effective monthly return rate after expense ratio
    const effectiveAnnualRate = annualReturnRate - expenseRatio;
    const monthlyRate = effectiveAnnualRate / 12 / 100;

    let currentMonthlyInvestment = monthlyInvestment;

    for (let year = 1; year <= years; year++) {
        // Calculate for each month in the year
        for (let month = 1; month <= 12; month++) {
            // Add monthly investment
            currentTotalValue += currentMonthlyInvestment;
            currentInvestedAmount += currentMonthlyInvestment;

            // Apply monthly return
            currentTotalValue *= (1 + monthlyRate);
        }

        // Step-up SIP annually
        if (stepUpPercentage > 0) {
            currentMonthlyInvestment *= (1 + stepUpPercentage / 100);
        }

        // Calculate estimated returns
        const estimatedReturns = currentTotalValue - currentInvestedAmount;

        // Calculate inflation adjusted value
        // Real Value = Nominal Value / (1 + Inflation Rate)^Years
        let inflationAdjustedValue;
        if (inflationRate > 0) {
            inflationAdjustedValue = currentTotalValue / Math.pow(1 + inflationRate / 100, year);
        }

        results.push({
            year,
            investedAmount: Math.round(currentInvestedAmount),
            estimatedReturns: Math.round(estimatedReturns),
            totalValue: Math.round(currentTotalValue),
            inflationAdjustedValue: inflationAdjustedValue ? Math.round(inflationAdjustedValue) : undefined,
        });
    }

    return results;
};
