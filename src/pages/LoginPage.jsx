import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Logo from "../components/Logo";

export default function LoginPage() {
    const { user, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError("Invalid credentials");
            setLoading(false);
            console.log(err)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gradient from-grad-start to-grad-end p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-80 space-y-4"
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                    <Logo className="w-10 h-10" />
                    <h1 className="text-xl font-semibold text-brand-349">Sign In</h1>
                </div>
                <input
                    type="email"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-361 hover:bg-brand-349 text-white py-2 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Signing in…" : "Login"}
                </button>
            </form>
        </div>
    );
}
