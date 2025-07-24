import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

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
        <div className="flex items-center justify-center h-screen bg-[linear-gradient(135deg,#C0EBD8_0%,#E1FEC1_100%)]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-4"
            >
                <h1 className="text-xl font-semibold text-brand-349 text-center">Sign In</h1>
                <input
                    type="email"
                    className="w-full	border rounded-lg px-3 py-2"
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
