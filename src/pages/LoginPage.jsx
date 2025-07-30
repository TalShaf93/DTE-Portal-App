import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from "../auth/useAuth";
import Logo, { LogoVariants } from "../components/Logo";

export default function LoginPage() {
    const { user, login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || "Invalid credentials");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gradient from-grad-start to-grad-end p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-80 space-y-4"
            >
                <div className="flex flex-col items-center gap-3 mb-2">
                    <LogoVariants.Login />
                    <div className="text-center">
                        <div className="text-xl font-bold text-brand-349 tracking-tight">
                            <span className="font-bold">Dan-Tech</span>
                            <span className="font-normal ml-1 text-brand-gray">Portal</span>
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold text-brand-349">Sign In</h1>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-361/40 focus:border-brand-361 transition-colors"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-361/40 focus:border-brand-361 transition-colors"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            disabled={loading}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-361 hover:bg-brand-349 text-white py-2 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>
        </div>
    );
}