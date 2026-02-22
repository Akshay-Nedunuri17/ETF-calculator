
"use client";

import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUpRight, Wallet, PieChart, TrendingUp, Home, Landmark, CreditCard, Banknote } from "lucide-react";
import { AssetType } from "@/utils/calculateReturns";

interface ResultsSectionProps {
    assetType: AssetType;
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
    inflationAdjustedValue?: number;
    // Real estate
    propertyValue?: number;
    cumulativeRental?: number;
    // FD (same as base fields, but re-labelled)
    // Loan
    emi?: number;
    principalPaid?: number;
    interestPaid?: number;
    outstandingPrincipal?: number;
}

interface CardProps {
    accent: string;
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
    highlight?: boolean;
}

const Card: React.FC<CardProps> = ({ accent, icon, label, value, sub, highlight }) => {
    if (highlight) {
        return (
            <div className={`group relative overflow-hidden bg-gradient-to-br ${accent} p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <PieChart className="w-40 h-40 text-white" />
                </div>
                <div className="relative z-10 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">{icon}</div>
                        <span className="text-sm font-bold text-white/80 uppercase tracking-widest">{label}</span>
                    </div>
                    <h3 className="text-3xl font-black mb-1 tracking-tight">{value}</h3>
                    {sub && <p className="text-sm text-white/70">{sub}</p>}
                </div>
            </div>
        );
    }
    return (
        <div className={`group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-t-4 ${accent} border-x-gray-100 border-b-gray-100 dark:border-gray-700`}>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl">{icon}</div>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{label}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">{value}</h3>
                {sub && <p className="text-xs text-gray-400 font-medium flex items-center gap-1">{sub}</p>}
            </div>
        </div>
    );
};

export const ResultsSection: React.FC<ResultsSectionProps> = (props) => {
    const { assetType } = props;

    // ── ETF / Crypto
    if (assetType === 'etf' || assetType === 'crypto') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card
                    accent="border-t-blue-500"
                    icon={<Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                    label="Invested"
                    value={formatCurrency(props.investedAmount)}
                    sub="Principal amount"
                />
                <Card
                    accent="border-t-green-500"
                    icon={<ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />}
                    label="Est. Returns"
                    value={formatCurrency(props.estimatedReturns)}
                    sub="Wealth gained"
                />
                <Card
                    highlight
                    accent="from-indigo-600 to-purple-700"
                    icon={<PieChart className="w-5 h-5 text-white" />}
                    label="Total Value"
                    value={formatCurrency(props.totalValue)}
                    sub={props.inflationAdjustedValue ? `Real Value: ${formatCurrency(props.inflationAdjustedValue)}` : 'Future value of your investment'}
                />
            </div>
        );
    }

    // ── Real Estate
    if (assetType === 'realestate') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card
                    accent="border-t-emerald-500"
                    icon={<Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                    label="Property Value"
                    value={formatCurrency(props.propertyValue ?? props.totalValue)}
                    sub="Capital appreciation"
                />
                <Card
                    accent="border-t-cyan-500"
                    icon={<TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
                    label="Rental Income"
                    value={formatCurrency(props.cumulativeRental ?? 0)}
                    sub="Cumulative rental"
                />
                <Card
                    highlight
                    accent="from-emerald-600 to-teal-600"
                    icon={<PieChart className="w-5 h-5 text-white" />}
                    label="Total Returns"
                    value={formatCurrency(props.totalValue)}
                    sub="Property value + Rental"
                />
            </div>
        );
    }

    // ── Bank FD
    if (assetType === 'fd') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card
                    accent="border-t-sky-500"
                    icon={<Landmark className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
                    label="Principal"
                    value={formatCurrency(props.investedAmount)}
                    sub="Amount deposited"
                />
                <Card
                    accent="border-t-indigo-500"
                    icon={<ArrowUpRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                    label="Interest Earned"
                    value={formatCurrency(props.estimatedReturns)}
                    sub="Total interest accrued"
                />
                <Card
                    highlight
                    accent="from-sky-600 to-indigo-700"
                    icon={<PieChart className="w-5 h-5 text-white" />}
                    label="Maturity Amount"
                    value={formatCurrency(props.totalValue)}
                    sub="Principal + Interest"
                />
            </div>
        );
    }

    // ── Loan
    if (assetType === 'loan') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card
                    accent="border-t-rose-500"
                    icon={<CreditCard className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                    label="Monthly EMI"
                    value={formatCurrency(props.emi ?? 0)}
                    sub="Per month payment"
                />
                <Card
                    accent="border-t-purple-500"
                    icon={<Banknote className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                    label="Total Interest"
                    value={formatCurrency(props.interestPaid ?? 0)}
                    sub="Interest cost of loan"
                />
                <Card
                    highlight
                    accent="from-rose-600 to-purple-700"
                    icon={<PieChart className="w-5 h-5 text-white" />}
                    label="Total Payment"
                    value={formatCurrency(props.totalValue)}
                    sub="Principal + Interest"
                />
            </div>
        );
    }

    return null;
};
