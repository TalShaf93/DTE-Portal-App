import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-gradient from-grad-start to-grad-end text-brand-349 p-6">
      <Logo className="w-10 h-10 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-brand-349 underline hover:text-brand-361">
        Go back home
      </Link>
    </div>
  );
}
