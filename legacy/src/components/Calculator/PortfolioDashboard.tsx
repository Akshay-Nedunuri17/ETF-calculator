
"use client";

import React from "react";
import { PortfolioYearSummary, AssetType, PortfolioItem } from "@/utils/calculateReturns";
import { ASSET_CONFIGS } from "@/utils/assetConfig";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChartCard } from "./ChartsSection";
import { CHART_TOOLTIP_STYLE, PIE_TOOLTIP_STYLE, Y_AXIS_FORMATTER, tooltipFormatter } from "./ChartConstants";
import { Wallet, Landmark, TrendingUp, PieChart as PieIcon } from "lucide-react";

interface PortfolioDashboardProps {
    data: PortfolioYearSummary[];
    items: PortfolioItem[];
    itemAssetTypes: Record<string, AssetType>; // itemId -> assetType for allocation pie
}

const Card = ({ label, value, sub, icon, accent, highlight = false }: any) => (
    <div className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${highlight
        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-transparent'
        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 border-t-4 ' + accent
        }`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${highlight ? 'bg-white/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
                {React.cloneElement(icon, { size: 24, className: highlight ? 'text-white' : accent.replace('border-t-', 'text-') })}
            </div>
        </div>
        <div>
            <p className={`text-sm font-semibold mb-1 ${highlight ? 'text-indigo-100' : 'text-gray-500'}`}>{label}</p>
            <h3 className={`text-2xl font-black tracking-tight ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{value}</h3>
            {sub && <p className={`text-xs mt-2 ${highlight ? 'text-indigo-200' : 'text-gray-400 font-medium'}`}>{sub}</p>}
        </div>
    </div>
);

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ data, items, itemAssetTypes }) => {
    if (data.length === 0) return null;

    const latest = data[data.length - 1];

    // 1. Category Allocation (by Asset Type)
    const allocationMap: Record<string, number> = {};
    const latestBreakdown = latest.itemBreakdown;

    Object.entries(latestBreakdown).forEach(([itemId, value]) => {
        const type = itemAssetTypes[itemId];
        if (value > 0) { // Only count assets
            allocationMap[type] = (allocationMap[type] || 0) + value;
        }
    });

    const categoryPieData = Object.entries(allocationMap).map(([type, value]) => ({
        name: ASSET_CONFIGS[type as AssetType].label,
        value,
        color: ASSET_CONFIGS[type as AssetType].gradientFrom // Use Hex code
    }));

    // 2. Individual Item Breakdown
    const itemPieData = Object.entries(latestBreakdown)
        .filter(([_, value]) => value > 0)
        .map(([itemId, value]) => {
            const item = items.find(i => i.id === itemId);
            return {
                name: item?.label || 'Unknown',
                value,
                color: item?.color || '#3b82f6'
            };
        });

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    label="Total Assets"
                    value={formatCurrency(latest.totalAssets)}
                    sub="Current value of all investments"
                    icon={<Wallet />}
                    accent="border-t-emerald-500"
                />
                <Card
                    label="Total Liabilities"
                    value={formatCurrency(latest.totalLiabilities)}
                    sub="Outstanding debt/loans"
                    icon={<Landmark />}
                    accent="border-t-rose-500"
                />
                <Card
                    label="Predicted Net Worth"
                    value={formatCurrency(latest.netWorth)}
                    sub={`In ${data.length} Years`}
                    icon={<TrendingUp />}
                    highlight
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Net Worth Trajectory */}
                <div className="lg:col-span-8">
                    <ChartCard title="Net Worth Trajectory (Assets vs Liabilities)" accent="bg-blue-600">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} label={{ value: 'Years', position: 'insideBottom', offset: -10, style: { fill: '#6B7280' } }} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickFormatter={Y_AXIS_FORMATTER}
                                />
                                <Tooltip
                                    {...CHART_TOOLTIP_STYLE}
                                    formatter={tooltipFormatter}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="totalAssets"
                                    stackId="1"
                                    stroke="#10b981"
                                    fill="url(#colorAssets)"
                                    strokeWidth={3}
                                    name="Total Assets"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="totalLiabilities"
                                    stackId="2"
                                    stroke="#f43f5e"
                                    fill="url(#colorDebt)"
                                    strokeWidth={3}
                                    name="Total Debt"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="netWorth"
                                    stroke="#3b82f6"
                                    fill="none"
                                    strokeWidth={4}
                                    strokeDasharray="5 5"
                                    name="Net Worth"
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Categories Breakdown */}
                <div className="lg:col-span-4">
                    <ChartCard title="Asset Allocation" accent="bg-purple-600">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                                <Pie
                                    data={categoryPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationDuration={1500}
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {categoryPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={tooltipFormatter}
                                    {...PIE_TOOLTIP_STYLE}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                            {categoryPieData.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs px-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-600 dark:text-gray-400 font-semibold">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">{latest.totalAssets > 0 ? ((item.value / latest.totalAssets) * 100).toFixed(1) : '0'}%</span>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>

                {/* Individual Items Breakdown */}
                <div className="lg:col-span-12">
                    <ChartCard title="Individual Item Allocation" accent="bg-indigo-600">
                        <div className="flex-1 w-full min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                                    <Pie
                                        data={itemPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                        animationDuration={1500}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {itemPieData.map((entry, index) => (
                                            <Cell key={`cell-item-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={tooltipFormatter}
                                        {...PIE_TOOLTIP_STYLE}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-h-[250px] overflow-y-auto pr-4 scrollbar-thin">
                                {itemPieData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-gray-600 dark:text-gray-400 font-bold truncate">{item.name}</span>
                                        </div>
                                        <span className="font-black text-blue-600 dark:text-blue-400 ml-2">{latest.totalAssets > 0 ? ((item.value / latest.totalAssets) * 100).toFixed(1) : '0'}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
};
