
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center px-4 py-8 font-inter">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-500">
                <div className="p-8">
                    <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors mb-6 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Login
                    </Link>

                    {!sent ? (
                        <>
                            <div className="text-left mb-8">
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                    Forgot <span className="text-blue-600 dark:text-blue-500 italic">Password?</span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">No worries, we'll send you reset instructions.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" /> Reset Password
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Send className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
                                We've sent password reset instructions to <br />
                                <span className="text-gray-900 dark:text-white font-bold">{email}</span>
                            </p>
                            <button
                                onClick={() => setSent(false)}
                                className="text-blue-600 dark:text-blue-500 font-bold hover:underline"
                            >
                                Didn't receive the email? Click to try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
