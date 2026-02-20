
"use client";

import React from "react";
import { Slider } from "../UI/Slider";
import { formatCurrency } from "@/utils/formatCurrency";

interface InputSectionProps {
    initialInvestment: number;
    setInitialInvestment: (value: number) => void;
    monthlyInvestment: number;
    setMonthlyInvestment: (value: number) => void;
    annualReturnRate: number;
    setAnnualReturnRate: (value: number) => void;
    years: number;
    setYears: (value: number) => void;
    inflationRate: number;
    setInflationRate: (value: number) => void;
    stepUpPercentage: number;
    setStepUpPercentage: (value: number) => void;
    expenseRatio: number;
    setExpenseRatio: (value: number) => void;
    showInflation: boolean;
    setShowInflation: (value: boolean) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
    initialInvestment,
    setInitialInvestment,
    monthlyInvestment,
    setMonthlyInvestment,
    annualReturnRate,
    setAnnualReturnRate,
    years,
    setYears,
    inflationRate,
    setInflationRate,
    stepUpPercentage,
    setStepUpPercentage,
    expenseRatio,
    setExpenseRatio,
    showInflation,
    setShowInflation,
}) => {
    return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-l-4 border-blue-500 pl-4">
                Investment Details
            </h2>

            <div className="space-y-8">
                {/* Initial Investment */}
                <div className="group">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Initial Lumpsum
                        </label>
                        <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800">
                            <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">
                                {formatCurrency(initialInvestment)}
                            </span>
                        </div>
                    </div>
                    <Slider
                        value={[initialInvestment]}
                        onValueChange={(val) => setInitialInvestment(val[0])}
                        min={0}
                        max={10000000}
                        step={1000}
                        className="py-2"
                    />
                </div>

                {/* Monthly SIP */}
                <div className="group">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Monthly SIP
                        </label>
                        <div className="bg-purple-50 dark:bg-purple-900/30 px-4 py-1.5 rounded-full border border-purple-100 dark:border-purple-800">
                            <span className="text-purple-700 dark:text-purple-300 font-bold text-lg">
                                {formatCurrency(monthlyInvestment)}
                            </span>
                        </div>
                    </div>
                    <Slider
                        value={[monthlyInvestment]}
                        onValueChange={(val) => setMonthlyInvestment(val[0])}
                        min={0}
                        max={500000}
                        step={500}
                        className="py-2"
                    />
                </div>

                {/* Expected Return */}
                <div className="group">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            Expected Return (p.a)
                        </label>
                        <div className="bg-green-50 dark:bg-green-900/30 px-4 py-1.5 rounded-full border border-green-100 dark:border-green-800">
                            <span className="text-green-700 dark:text-green-300 font-bold text-lg">
                                {annualReturnRate}%
                            </span>
                        </div>
                    </div>
                    <Slider
                        value={[annualReturnRate]}
                        onValueChange={(val) => setAnnualReturnRate(val[0])}
                        min={1}
                        max={30}
                        step={0.1}
                        className="py-2"
                    />
                </div>

                {/* Duration */}
                <div className="group">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            Time Period
                        </label>
                        <div className="bg-orange-50 dark:bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-100 dark:border-orange-800">
                            <span className="text-orange-700 dark:text-orange-300 font-bold text-lg">
                                {years} Years
                            </span>
                        </div>
                    </div>
                    <Slider
                        value={[years]}
                        onValueChange={(val) => setYears(val[0])}
                        min={1}
                        max={60}
                        step={1}
                        className="py-2"
                    />
                </div>
            </div>

            {/* Advanced Settings Divider */}
            <div className="my-8 flex items-center gap-4">
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advanced Settings</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                {/* Step-up SIP */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Step-up SIP (%)</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={stepUpPercentage}
                            onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                            className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        />
                        <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
                    </div>
                </div>

                {/* Expense Ratio */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Expense Ratio (%)</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.01"
                            value={expenseRatio}
                            onChange={(e) => setExpenseRatio(Number(e.target.value))}
                            className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        />
                        <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
                    </div>
                </div>
            </div>

            {/* Inflation Toggle */}
            <div className="mt-6 flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => setShowInflation(!showInflation)}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${showInflation ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${showInflation ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">Adjust for Inflation</label>
                </div>

                <div className={`flex-1 transition-all duration-300 ${showInflation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                    <div
                        className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Slider
                            value={[inflationRate]}
                            onValueChange={(val) => setInflationRate(val[0])}
                            min={0}
                            max={15}
                            step={0.5}
                            className="w-32"
                        />
                        <div className="min-w-[3rem] text-right font-bold text-blue-600 dark:text-blue-400">
                            {inflationRate}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
