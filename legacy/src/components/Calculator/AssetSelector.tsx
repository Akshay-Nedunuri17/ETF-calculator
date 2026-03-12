
"use client";

import React from "react";
import { AssetType } from "@/utils/calculateReturns";
import { ASSET_CONFIGS } from "@/utils/assetConfig";

interface AssetSelectorProps {
    selected: AssetType;
    onSelect: (asset: AssetType) => void;
}

const ASSETS: AssetType[] = ['etf', 'crypto', 'realestate', 'fd', 'loan'];

const ACCENT_CLASSES: Record<AssetType, string> = {
    etf: 'bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/50',
    crypto: 'bg-orange-500 text-white shadow-orange-200 dark:shadow-orange-900/50',
    realestate: 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/50',
    fd: 'bg-sky-600 text-white shadow-sky-200 dark:shadow-sky-900/50',
    loan: 'bg-rose-600 text-white shadow-rose-200 dark:shadow-rose-900/50',
};

export const AssetSelector: React.FC<AssetSelectorProps> = ({ selected, onSelect }) => {
    return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {ASSETS.map((asset) => {
                    const config = ASSET_CONFIGS[asset];
                    const isActive = asset === selected;
                    return (
                        <button
                            key={asset}
                            onClick={() => onSelect(asset)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200 ${isActive
                                    ? `${ACCENT_CLASSES[asset]} shadow-lg scale-[1.03]`
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
                                }`}
                        >
                            <span className="text-base leading-none">{config.emoji}</span>
                            <span>{config.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
