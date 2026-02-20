
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Header";
import { InputSection } from "@/components/Calculator/InputSection";
import { ResultsSection } from "@/components/Calculator/ResultsSection";
import { ChartsSection } from "@/components/Calculator/ChartsSection";
import { calculateReturns, CalculationResult } from "@/utils/calculateReturns";
import { Download, Share2, RefreshCw } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
    // State
    const [initialInvestment, setInitialInvestment] = useState(100000);
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [annualReturnRate, setAnnualReturnRate] = useState(12);
    const [years, setYears] = useState(10);
    const [inflationRate, setInflationRate] = useState(6);
    const [stepUpPercentage, setStepUpPercentage] = useState(0);
    const [expenseRatio, setExpenseRatio] = useState(0.5);
    const [showInflation, setShowInflation] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem("etfCalcData");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setInitialInvestment(parsed.initialInvestment ?? 100000);
                setMonthlyInvestment(parsed.monthlyInvestment ?? 10000);
                setAnnualReturnRate(parsed.annualReturnRate ?? 12);
                setYears(parsed.years ?? 10);
                setInflationRate(parsed.inflationRate ?? 6);
                setStepUpPercentage(parsed.stepUpPercentage ?? 0);
                setExpenseRatio(parsed.expenseRatio ?? 0.5);
                setShowInflation(parsed.showInflation ?? false);
            } catch (e) {
                console.error("Failed to parse saved data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            const dataToSave = {
                initialInvestment,
                monthlyInvestment,
                annualReturnRate,
                years,
                inflationRate,
                stepUpPercentage,
                expenseRatio,
                showInflation,
            };
            localStorage.setItem("etfCalcData", JSON.stringify(dataToSave));
        }
    }, [
        initialInvestment,
        monthlyInvestment,
        annualReturnRate,
        years,
        inflationRate,
        stepUpPercentage,
        expenseRatio,
        showInflation,
        isLoaded,
    ]);

    // Calculations
    const results: CalculationResult[] = useMemo(() => {
        return calculateReturns({
            initialInvestment,
            monthlyInvestment,
            annualReturnRate,
            years,
            inflationRate: showInflation ? inflationRate : 0,
            stepUpPercentage,
            expenseRatio,
        });
    }, [
        initialInvestment,
        monthlyInvestment,
        annualReturnRate,
        years,
        inflationRate,
        stepUpPercentage,
        expenseRatio,
        showInflation,
    ]);

    const finalResult = results[results.length - 1] || {
        investedAmount: 0,
        estimatedReturns: 0,
        totalValue: 0,
        inflationAdjustedValue: 0,
    };

    const handleReset = () => {
        setInitialInvestment(100000);
        setMonthlyInvestment(10000);
        setAnnualReturnRate(12);
        setYears(10);
        setInflationRate(6);
        setStepUpPercentage(0);
        setExpenseRatio(0.5);
        setShowInflation(false);
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById("calculator-content");
        if (element) {
            try {
                // Reduce scale for smaller file size (1.5 is usually sufficient for screen/print)
                const canvas = await html2canvas(element, {
                    scale: 1.5,
                    useCORS: true,
                    logging: false
                });

                // Use JPEG instead of PNG for better compression (0.7 quality)
                const imgData = canvas.toDataURL("image/jpeg", 0.7);

                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
                pdf.save("etf-investment-report.pdf");
            } catch (error) {
                console.error("Error generating PDF", error);
                alert("Failed to generate PDF. Please try again.");
            }
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'ETF Investment Calculator',
                text: `Check out my investment projection! I'm planning to invest for ${years} years.`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };


    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300 font-inter">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="calculator-content">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                        ETF Investment Calculator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Plan your financial freedom with precision. Calculate SIP returns, account for inflation, and visualize your wealth growth.
                    </p>
                </div>

                <ResultsSection
                    investedAmount={finalResult.investedAmount}
                    estimatedReturns={finalResult.estimatedReturns}
                    totalValue={finalResult.totalValue}
                    inflationAdjustedValue={showInflation ? finalResult.inflationAdjustedValue : undefined}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-4 space-y-6">
                        <InputSection
                            initialInvestment={initialInvestment}
                            setInitialInvestment={setInitialInvestment}
                            monthlyInvestment={monthlyInvestment}
                            setMonthlyInvestment={setMonthlyInvestment}
                            annualReturnRate={annualReturnRate}
                            setAnnualReturnRate={setAnnualReturnRate}
                            years={years}
                            setYears={setYears}
                            inflationRate={inflationRate}
                            setInflationRate={setInflationRate}
                            stepUpPercentage={stepUpPercentage}
                            setStepUpPercentage={setStepUpPercentage}
                            expenseRatio={expenseRatio}
                            setExpenseRatio={setExpenseRatio}
                            showInflation={showInflation}
                            setShowInflation={setShowInflation}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all font-medium"
                            >
                                <RefreshCw className="w-4 h-4" /> Reset
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-blue-100 dark:border-blue-900 rounded-xl text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all font-medium"
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all transform duration-200"
                        >
                            <Download className="w-5 h-5" /> Download Report
                        </button>
                    </div>

                    {/* Right Column: Charts & Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <ChartsSection
                            data={results}
                            investedAmount={finalResult.investedAmount}
                            estimatedReturns={finalResult.estimatedReturns}
                            showInflation={showInflation}
                        />

                        {/* Additional Info */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Understanding Your ETF Investment</h3>
                            <div className="grid md:grid-cols-3 gap-6 text-sm">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">Power of Compounding</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Your money works for you over time. Reinvested earnings generate their own earnings, leading to exponential growth.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">Step-up SIP</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Increasing your SIP by even 5-10% annually can drastically increase your final corpus compared to a fixed SIP.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-green-600 dark:text-green-400">Expense Ratio</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Lower expense ratios in ETFs mean higher take-home returns. A 0.5% difference can cost lakhs over 20 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 py-10">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p className="mb-2">© {new Date().getFullYear()} ETF Investment Calculator India. Built for long-term investors.</p>
                    <p className="opacity-75">Disclaimer: This tool is for educational purposes only. Past performance is not indicative of future returns.</p>
                </div>
            </footer>
        </div>
    );
}
