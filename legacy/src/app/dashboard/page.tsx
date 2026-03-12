
"use client";

import React from "react";
import Navbar from "@/components/Header";
import Link from "next/link";
import { 
    Calculator, 
    TrendingUp, 
    PieChart, 
    Briefcase, 
    ShieldCheck, 
    ArrowRight,
    Search,
    User,
    Settings,
    Bell
} from "lucide-react";

const AppFeatures = [
    {
        title: "ETF Calculator",
        description: "Calculate potential returns on your ETF investments with SIP and Lumpsum options.",
        icon: Calculator,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
        href: "/"
    },
    {
        title: "Portfolio Tracker",
        description: "Maintain a record of all your investments and track cumulative growth.",
        icon: Briefcase,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
        href: "/"
    },
    {
        title: "Comparison Engine",
        description: "Compare different assets like Real Estate, FD, and Crypto side-by-side.",
        icon: TrendingUp,
        color: "text-green-600 bg-green-50 dark:bg-green-900/20",
        href: "/"
    },
    {
        title: "Inflation Adjustment",
        description: "See the real value of your wealth by adjusting for inflation rates.",
        icon: ShieldCheck,
        color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
        href: "/"
    }
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300 font-inter">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                            Investor <span className="text-blue-600 dark:text-blue-500 italic">Dashboard</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Welcome back! Here's an overview of your wealth building tools.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search tools..." 
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64 transition-all"
                            />
                        </div>
                        <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Tools Overview */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {AppFeatures.map((feature, i) => (
                                <Link 
                                    key={i} 
                                    href={feature.href}
                                    className="group p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${feature.color}`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        {feature.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {/* App Summary / Analytics Mockup */}
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">
                                Wealth <span className="text-blue-600 italic">Insights</span>
                            </h3>
                            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                                <PieChart className="w-12 h-12 text-gray-200 dark:text-gray-700" />
                                <div className="space-y-1">
                                    <p className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs">No data recorded</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Start by adding your investments in the calculator to see your wealth distribution here.</p>
                                </div>
                                <Link href="/" className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-full text-sm hover:shadow-lg transition-all">
                                    Start Calculating
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: User Profile & Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Profile Section */}
                        <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-3xl shadow-xl text-white">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black">Akshay N.</h2>
                                    <p className="text-blue-100/80 font-medium text-sm">Premium Member</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 py-6 border-y border-white/10 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100/60 text-sm">Calculations made</span>
                                    <span className="font-black">24</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100/60 text-sm">Portfolio value</span>
                                    <span className="font-black text-lg">₹12,45,000</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl shadow-lg hover:shadow-black/10 hover:translate-y-[-2px] transition-all transform duration-200">
                                View Full Report
                            </button>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-2 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">ETF SIP Projection</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-400 dark:text-gray-600 text-xs border-t border-gray-100 dark:border-gray-900 mt-12">
                <p>© {new Date().getFullYear()} WealthCalc India Dashboard. Empowering your financial future.</p>
            </footer>
        </div>
    );
}
