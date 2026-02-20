
"use client";

import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUpRight, Wallet, PieChart, TrendingUp } from "lucide-react";

interface ResultsSectionProps {
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
    inflationAdjustedValue?: number; // Optional
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
    investedAmount,
    estimatedReturns,
    totalValue,
    inflationAdjustedValue,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Invested Amount Card */}
            <div className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-t-4 border-t-blue-500 border-x-gray-100 border-b-gray-100 dark:border-gray-700">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Invested</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
                        {formatCurrency(investedAmount)}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">Principal amount</p>
                </div>
            </div>

            {/* Estimated Returns Card */}
            <div className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-t-4 border-t-green-500 border-x-gray-100 border-b-gray-100 dark:border-gray-700">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-xl">
                            <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Est. Returns</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-1 tracking-tight">
                        {formatCurrency(estimatedReturns)}
                    </h3>
                    <p className="text-xs text-green-600/70 dark:text-green-400/70 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Wealth gained
                    </p>
                </div>
            </div>

            {/* Total Value Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <PieChart className="w-40 h-40 text-white" />
                </div>

                <div className="relative z-10 text-white">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                                <PieChart className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-white/80 uppercase tracking-widest">Total Value</span>
                        </div>
                        {inflationAdjustedValue !== undefined && (
                            <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-medium backdrop-blur-md">
                                Inflation Adj.
                            </span>
                        )}
                    </div>

                    <h3 className="text-4xl font-black mb-2 tracking-tight">
                        {formatCurrency(totalValue)}
                    </h3>

                    {inflationAdjustedValue !== undefined ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg">
                            <span className="text-sm font-medium text-white/90">Real Value: </span>
                            <span className="text-lg font-bold text-white">{formatCurrency(inflationAdjustedValue)}</span>
                        </div>
                    ) : (
                        <p className="text-sm text-white/70">Future value of your investment</p>
                    )}
                </div>
            </div>
        </div>
    );
};
