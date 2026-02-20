
"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Area,
    AreaChart,
} from "recharts";
import { CalculationResult } from "@/utils/calculateReturns";
import { formatCurrency } from "@/utils/formatCurrency";

interface ChartsSectionProps {
    data: CalculationResult[];
    investedAmount: number;
    estimatedReturns: number;
    showInflation?: boolean;
}

const COLORS = ["#3b82f6", "#10b981"]; // Blue for Invested, Green for Returns

export const ChartsSection: React.FC<ChartsSectionProps> = ({
    data,
    investedAmount,
    estimatedReturns,
    showInflation = false,
}) => {
    const pieData = [
        { name: "Invested", value: investedAmount },
        { name: "Returns", value: estimatedReturns },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Growth Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-[400px]">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    Growth Trajectory
                </h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis
                                dataKey="year"
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `Yr ${value}`}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
                                    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                                    return `${(value / 1000).toFixed(0)}k`;
                                }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", color: "#fff", padding: "12px" }}
                                itemStyle={{ color: "#d1d5db", fontSize: "12px", marginBottom: "4px" }}
                                formatter={(value: number) => formatCurrency(value)}
                                labelFormatter={(label) => `Year ${label}`}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area
                                type="monotone"
                                dataKey="investedAmount"
                                name="Invested"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorInvested)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="totalValue"
                                name="Total Value"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Allocation Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-[400px]">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                    Allocation Breakdown
                </h3>
                <div className="flex-1 w-full min-h-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        stroke="none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{ backgroundColor: "#2563eb", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold" }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text for Donut Chart */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6 text-center pointer-events-none">
                        <p className="text-xs text-gray-400 font-medium uppercase">Total Corpus</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
