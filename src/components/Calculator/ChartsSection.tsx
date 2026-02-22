
"use client";

import React from "react";
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, Area, AreaChart, BarChart, Bar,
} from "recharts";
import { CalculationResult, AssetType } from "@/utils/calculateReturns";
import { formatCurrency } from "@/utils/formatCurrency";

interface ChartsSectionProps {
    assetType: AssetType;
    data: CalculationResult[];
    investedAmount: number;
    estimatedReturns: number;
    showInflation?: boolean;
}

const tooltipStyle = {
    contentStyle: { backgroundColor: "#1f2937", border: "none", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", color: "#fff", padding: "12px" },
    itemStyle: { color: "#d1d5db", fontSize: "12px", marginBottom: "4px" },
};

const yAxisFormatter = (value: number) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    return `${(value / 1000).toFixed(0)}k`;
};

const ChartCard = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-[400px]">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className={`w-1.5 h-6 ${accent} rounded-full`} />
            {title}
        </h3>
        <div className="flex-1 w-full min-h-0">{children}</div>
    </div>
);

export const ChartsSection: React.FC<ChartsSectionProps> = ({
    assetType, data, investedAmount, estimatedReturns, showInflation = false,
}) => {
    // ── ETF / Crypto ────────────────────────────────────────────────────────
    if (assetType === 'etf' || assetType === 'crypto') {
        const pieData = [
            { name: "Invested", value: investedAmount },
            { name: "Returns", value: estimatedReturns },
        ];
        const COLORS = ["#3b82f6", "#10b981"];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard title="Growth Trajectory" accent="bg-blue-500">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={yAxisFormatter} />
                            <Tooltip {...tooltipStyle} formatter={(value: number) => formatCurrency(value)} labelFormatter={(l) => `Year ${l}`} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="investedAmount" name="Invested" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={2} />
                            <Area type="monotone" dataKey="totalValue" name="Total Value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={3} />
                            {showInflation && (
                                <Area type="monotone" dataKey="inflationAdjustedValue" name="Real Value" stroke="#f59e0b" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Allocation Breakdown" accent="bg-purple-500">
                    <div className="relative w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="45%" innerRadius={75} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                                </Pie>
                                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: "#2563eb", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold" }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-xs text-gray-400 uppercase font-medium">Corpus</p>
                        </div>
                    </div>
                </ChartCard>
            </div>
        );
    }

    // ── Real Estate ──────────────────────────────────────────────────────────
    if (assetType === 'realestate') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard title="Property Growth" accent="bg-emerald-500">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorProp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={yAxisFormatter} />
                            <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => `Year ${l}`} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#10b981" fillOpacity={1} fill="url(#colorProp)" strokeWidth={3} />
                            <Area type="monotone" dataKey="cumulativeRental" name="Rental Income" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRent)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Returns Breakdown" accent="bg-teal-500">
                    <div className="relative w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Capital Gain", value: Math.max(0, (data[data.length - 1]?.propertyValue ?? 0) - (data[0]?.investedAmount ?? 0)) },
                                        { name: "Rental Income", value: data[data.length - 1]?.cumulativeRental ?? 0 },
                                    ]}
                                    cx="50%" cy="45%" innerRadius={75} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none"
                                >
                                    <Cell fill="#10b981" stroke="none" />
                                    <Cell fill="#06b6d4" stroke="none" />
                                </Pie>
                                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: "#059669", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold" }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        );
    }

    // ── Bank FD ──────────────────────────────────────────────────────────────
    if (assetType === 'fd') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard title="Balance Growth" accent="bg-sky-500">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorFD" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={yAxisFormatter} />
                            <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => `Year ${l}`} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="investedAmount" name="Principal" stroke="#6366f1" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                            <Area type="monotone" dataKey="totalValue" name="Balance" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorFD)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Allocation Breakdown" accent="bg-indigo-500">
                    <div className="relative w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Principal", value: data[data.length - 1]?.investedAmount ?? 0 },
                                        { name: "Interest", value: data[data.length - 1]?.estimatedReturns ?? 0 },
                                    ]}
                                    cx="50%" cy="45%" innerRadius={75} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none"
                                >
                                    <Cell fill="#6366f1" stroke="none" />
                                    <Cell fill="#0ea5e9" stroke="none" />
                                </Pie>
                                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: "#0369a1", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold" }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        );
    }

    // ── Loan ─────────────────────────────────────────────────────────────────
    if (assetType === 'loan') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard title="Amortisation Schedule" accent="bg-rose-500">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={yAxisFormatter} />
                            <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => `Year ${l}`} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar dataKey="principalPaid" name="Principal Paid" stackId="a" fill="#a855f7" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="interestPaid" name="Interest Paid" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Outstanding Principal" accent="bg-purple-500">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorLoan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={yAxisFormatter} />
                            <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => `Year ${l}`} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="outstandingPrincipal" name="Outstanding Balance" stroke="#f43f5e" fillOpacity={1} fill="url(#colorLoan)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        );
    }

    return null;
};
