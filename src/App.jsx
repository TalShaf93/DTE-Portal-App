import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy‑loaded feature modules
const ProductionPage = lazy(() => import("./pages/Production/ProductionPage"));
const WorkerPage = lazy(() => import("./pages/ProductionWorker/WorkerPage"));
const UsersPage = lazy(() => import("./pages/admin/UsersPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected area */}
        <Route element={<ProtectedRoute />}> {/* require any authenticated user */}
          <Route element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="production" element={<ProductionPage />} />

            {/* Admin‑only subsection */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="admin/users" element={<UsersPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute roles={["pworker"]} />}> 
            <Route element={<WorkerLayout />}>
              <Route path="worker" element={<WorkerPage />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
