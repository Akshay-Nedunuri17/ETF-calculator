
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Header";
import { AssetSelector } from "@/components/Calculator/AssetSelector";
import { InputSection } from "@/components/Calculator/InputSection";
import { ResultsSection } from "@/components/Calculator/ResultsSection";
import { ChartsSection } from "@/components/Calculator/ChartsSection";
import { calculateReturns, calculateEMI, CalculationResult, AssetType } from "@/utils/calculateReturns";
import { ASSET_CONFIGS } from "@/utils/assetConfig";
import { Download, Share2, RefreshCw } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Static map — Tailwind JIT cannot resolve dynamically interpolated class names
const blurbHeadingClass: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    teal: 'text-teal-600 dark:text-teal-400',
    sky: 'text-sky-600 dark:text-sky-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    rose: 'text-rose-600 dark:text-rose-400',
    pink: 'text-pink-600 dark:text-pink-400',
};

const DEFAULTS = {
    assetType: 'etf' as AssetType,
    // ETF / Crypto
    initialInvestment: 100000,
    monthlyInvestment: 10000,
    annualReturnRate: 12,
    years: 10,
    inflationRate: 6,
    stepUpPercentage: 0,
    expenseRatio: 0.5,
    showInflation: false,
    // Real estate
    propertyValue: 5000000,
    rentalYield: 3,
    appreciationRate: 8,
    // FD
    fdPrincipal: 100000,
    fdRate: 7,
    fdTenureMonths: 60,
    compoundingFrequency: 4,
    // Loan
    loanAmount: 1000000,
    loanRate: 10,
    loanTenureMonths: 240,
};

export default function Home() {
    const [assetType, setAssetType] = useState<AssetType>(DEFAULTS.assetType);

    // ETF / Crypto
    const [initialInvestment, setInitialInvestment] = useState(DEFAULTS.initialInvestment);
    const [monthlyInvestment, setMonthlyInvestment] = useState(DEFAULTS.monthlyInvestment);
    const [annualReturnRate, setAnnualReturnRate] = useState(DEFAULTS.annualReturnRate);
    const [years, setYears] = useState(DEFAULTS.years);
    const [inflationRate, setInflationRate] = useState(DEFAULTS.inflationRate);
    const [stepUpPercentage, setStepUpPercentage] = useState(DEFAULTS.stepUpPercentage);
    const [expenseRatio, setExpenseRatio] = useState(DEFAULTS.expenseRatio);
    const [showInflation, setShowInflation] = useState(DEFAULTS.showInflation);

    // Real estate
    const [propertyValue, setPropertyValue] = useState(DEFAULTS.propertyValue);
    const [rentalYield, setRentalYield] = useState(DEFAULTS.rentalYield);
    const [appreciationRate, setAppreciationRate] = useState(DEFAULTS.appreciationRate);

    // FD
    const [fdPrincipal, setFdPrincipal] = useState(DEFAULTS.fdPrincipal);
    const [fdRate, setFdRate] = useState(DEFAULTS.fdRate);
    const [fdTenureMonths, setFdTenureMonths] = useState(DEFAULTS.fdTenureMonths);
    const [compoundingFrequency, setCompoundingFrequency] = useState(DEFAULTS.compoundingFrequency);

    // Loan
    const [loanAmount, setLoanAmount] = useState(DEFAULTS.loanAmount);
    const [loanRate, setLoanRate] = useState(DEFAULTS.loanRate);
    const [loanTenureMonths, setLoanTenureMonths] = useState(DEFAULTS.loanTenureMonths);

    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem("wealthCalcData");
        if (savedData) {
            try {
                const p = JSON.parse(savedData);
                setAssetType(p.assetType ?? DEFAULTS.assetType);
                setInitialInvestment(p.initialInvestment ?? DEFAULTS.initialInvestment);
                setMonthlyInvestment(p.monthlyInvestment ?? DEFAULTS.monthlyInvestment);
                setAnnualReturnRate(p.annualReturnRate ?? DEFAULTS.annualReturnRate);
                setYears(p.years ?? DEFAULTS.years);
                setInflationRate(p.inflationRate ?? DEFAULTS.inflationRate);
                setStepUpPercentage(p.stepUpPercentage ?? DEFAULTS.stepUpPercentage);
                setExpenseRatio(p.expenseRatio ?? DEFAULTS.expenseRatio);
                setShowInflation(p.showInflation ?? DEFAULTS.showInflation);
                setPropertyValue(p.propertyValue ?? DEFAULTS.propertyValue);
                setRentalYield(p.rentalYield ?? DEFAULTS.rentalYield);
                setAppreciationRate(p.appreciationRate ?? DEFAULTS.appreciationRate);
                setFdPrincipal(p.fdPrincipal ?? DEFAULTS.fdPrincipal);
                setFdRate(p.fdRate ?? DEFAULTS.fdRate);
                setFdTenureMonths(p.fdTenureMonths ?? DEFAULTS.fdTenureMonths);
                setCompoundingFrequency(p.compoundingFrequency ?? DEFAULTS.compoundingFrequency);
                setLoanAmount(p.loanAmount ?? DEFAULTS.loanAmount);
                setLoanRate(p.loanRate ?? DEFAULTS.loanRate);
                setLoanTenureMonths(p.loanTenureMonths ?? DEFAULTS.loanTenureMonths);
            } catch (e) {
                console.error("Failed to parse saved data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("wealthCalcData", JSON.stringify({
            assetType, initialInvestment, monthlyInvestment, annualReturnRate, years,
            inflationRate, stepUpPercentage, expenseRatio, showInflation,
            propertyValue, rentalYield, appreciationRate,
            fdPrincipal, fdRate, fdTenureMonths, compoundingFrequency,
            loanAmount, loanRate, loanTenureMonths,
        }));
    }, [
        assetType, initialInvestment, monthlyInvestment, annualReturnRate, years,
        inflationRate, stepUpPercentage, expenseRatio, showInflation,
        propertyValue, rentalYield, appreciationRate,
        fdPrincipal, fdRate, fdTenureMonths, compoundingFrequency,
        loanAmount, loanRate, loanTenureMonths, isLoaded,
    ]);

    // Calculations
    const results: CalculationResult[] = useMemo(() => {
        return calculateReturns({
            assetType,
            initialInvestment,
            monthlyInvestment,
            annualReturnRate,
            years,
            inflationRate: showInflation ? inflationRate : 0,
            stepUpPercentage,
            expenseRatio,
            propertyValue,
            rentalYield,
            appreciationRate,
            fdPrincipal,
            fdRate,
            fdTenureMonths,
            compoundingFrequency,
            loanAmount,
            loanRate,
            loanTenureMonths,
        });
    }, [
        assetType, initialInvestment, monthlyInvestment, annualReturnRate, years,
        inflationRate, stepUpPercentage, expenseRatio, showInflation,
        propertyValue, rentalYield, appreciationRate,
        fdPrincipal, fdRate, fdTenureMonths, compoundingFrequency,
        loanAmount, loanRate, loanTenureMonths,
    ]);

    const finalResult = results[results.length - 1] || {
        investedAmount: 0, estimatedReturns: 0, totalValue: 0,
        inflationAdjustedValue: 0, propertyValue: 0, cumulativeRental: 0,
        emi: 0, principalPaid: 0, interestPaid: 0, outstandingPrincipal: 0,
    };

    const emi = useMemo(() =>
        assetType === 'loan' ? calculateEMI(loanAmount, loanRate, loanTenureMonths) : 0,
        [assetType, loanAmount, loanRate, loanTenureMonths]
    );

    const config = ASSET_CONFIGS[assetType];

    const handleReset = () => {
        setInitialInvestment(DEFAULTS.initialInvestment);
        setMonthlyInvestment(DEFAULTS.monthlyInvestment);
        setAnnualReturnRate(DEFAULTS.annualReturnRate);
        setYears(DEFAULTS.years);
        setInflationRate(DEFAULTS.inflationRate);
        setStepUpPercentage(DEFAULTS.stepUpPercentage);
        setExpenseRatio(DEFAULTS.expenseRatio);
        setShowInflation(DEFAULTS.showInflation);
        setPropertyValue(DEFAULTS.propertyValue);
        setRentalYield(DEFAULTS.rentalYield);
        setAppreciationRate(DEFAULTS.appreciationRate);
        setFdPrincipal(DEFAULTS.fdPrincipal);
        setFdRate(DEFAULTS.fdRate);
        setFdTenureMonths(DEFAULTS.fdTenureMonths);
        setCompoundingFrequency(DEFAULTS.compoundingFrequency);
        setLoanAmount(DEFAULTS.loanAmount);
        setLoanRate(DEFAULTS.loanRate);
        setLoanTenureMonths(DEFAULTS.loanTenureMonths);
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById("calculator-content");
        if (element) {
            try {
                const canvas = await html2canvas(element, { scale: 1.5, useCORS: true, logging: false });
                const imgData = canvas.toDataURL("image/jpeg", 0.7);
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${assetType}-investment-report.pdf`);
            } catch (error) {
                console.error("Error generating PDF", error);
                alert("Failed to generate PDF. Please try again.");
            }
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'WealthCalc India',
                text: `Check out my ${config.label} investment projection!`,
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
                {/* Hero */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Investment Calculator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {config.description}
                    </p>
                </div>

                {/* Asset Selector */}
                <div className="mb-8">
                    <AssetSelector selected={assetType} onSelect={setAssetType} />
                </div>

                {/* Results */}
                <ResultsSection
                    assetType={assetType}
                    investedAmount={finalResult.investedAmount}
                    estimatedReturns={finalResult.estimatedReturns}
                    totalValue={finalResult.totalValue}
                    inflationAdjustedValue={showInflation ? finalResult.inflationAdjustedValue : undefined}
                    propertyValue={finalResult.propertyValue}
                    cumulativeRental={finalResult.cumulativeRental}
                    emi={Math.round(emi)}
                    interestPaid={finalResult.interestPaid}
                    outstandingPrincipal={finalResult.outstandingPrincipal}
                />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Inputs */}
                    <div className="lg:col-span-4 space-y-6">
                        <InputSection
                            assetType={assetType}
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
                            propertyValue={propertyValue}
                            setPropertyValue={setPropertyValue}
                            rentalYield={rentalYield}
                            setRentalYield={setRentalYield}
                            appreciationRate={appreciationRate}
                            setAppreciationRate={setAppreciationRate}
                            fdPrincipal={fdPrincipal}
                            setFdPrincipal={setFdPrincipal}
                            fdRate={fdRate}
                            setFdRate={setFdRate}
                            fdTenureMonths={fdTenureMonths}
                            setFdTenureMonths={setFdTenureMonths}
                            compoundingFrequency={compoundingFrequency}
                            setCompoundingFrequency={setCompoundingFrequency}
                            loanAmount={loanAmount}
                            setLoanAmount={setLoanAmount}
                            loanRate={loanRate}
                            setLoanRate={setLoanRate}
                            loanTenureMonths={loanTenureMonths}
                            setLoanTenureMonths={setLoanTenureMonths}
                        />

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={handleReset} className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all font-medium">
                                <RefreshCw className="w-4 h-4" /> Reset
                            </button>
                            <button onClick={handleShare} className="flex items-center justify-center gap-2 px-4 py-3 border border-blue-100 dark:border-blue-900 rounded-xl text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all font-medium">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                        <button onClick={handleDownloadPDF} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all transform duration-200">
                            <Download className="w-5 h-5" /> Download Report
                        </button>
                    </div>

                    {/* Right: Charts & Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <ChartsSection
                            assetType={assetType}
                            data={results}
                            investedAmount={finalResult.investedAmount}
                            estimatedReturns={finalResult.estimatedReturns}
                            showInflation={showInflation}
                        />

                        {/* Info blurbs */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Understanding {config.label} Investment
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6 text-sm">
                                {config.infoBlurbs.map((blurb, i) => (
                                    <div key={i} className="space-y-2">
                                        <h4 className={`font-semibold ${blurbHeadingClass[blurb.color] ?? 'text-gray-600 dark:text-gray-400'}`}>
                                            {blurb.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{blurb.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 py-10">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p className="mb-2">© {new Date().getFullYear()} WealthCalc India. Built for smart investors.</p>
                    <p className="opacity-75">Disclaimer: This tool is for educational purposes only. Past performance is not indicative of future returns.</p>
                </div>
            </footer>
        </div>
    );
}
