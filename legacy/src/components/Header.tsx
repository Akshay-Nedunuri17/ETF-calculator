"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, TrendingUp, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const isLoggedIn = status === 'authenticated' && !!session?.user;

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-2" />
                            <span className="font-bold text-xl text-gray-900 dark:text-white">WealthCalc India</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/dashboard" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                            Dashboard
                        </Link>
                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-800"></div>

                        {isLoggedIn ? (
                            /* ---- Logged-in user section ---- */
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name ?? 'User avatar'}
                                        width={36}
                                        height={36}
                                        className="rounded-full ring-2 ring-blue-500 object-cover"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                        {session.user?.name?.charAt(0)?.toUpperCase() ?? <User className="w-4 h-4" />}
                                    </div>
                                )}
                                {/* Name */}
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
                                    {session.user?.name ?? session.user?.email}
                                </span>
                                {/* Sign Out */}
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-800 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            /* ---- Guest section ---- */
                            <>
                                <Link href="/login" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                                    Log In
                                </Link>
                                <Link href="/signup" className="px-5 py-2.5 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                                    Sign Up
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Link href="/dashboard" className="block text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600">
                        Dashboard
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-3 py-1">
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full ring-2 ring-blue-500"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                        {session.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                                    </div>
                                )}
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                                    {session.user?.name ?? session.user?.email}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600">
                                Log In
                            </Link>
                            <Link href="/signup" className="block px-5 py-3 rounded-xl bg-blue-600 text-white text-center text-sm font-bold">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
