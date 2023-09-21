import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./adapters/pages/HomePage";
import LoadingScreen from "./adapters/pages/LoadingPage";
import RegisterPage from "./adapters/pages/RegisterPage";
import LoginPage from "./adapters/pages/LoginPage";
import { ProtectedRoute } from "./adapters/components/ProtectedRoute";
import MissingPage from "./adapters/pages/MissingPage";
import SignUpPage from "./adapters/pages/SignUpPage";

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* catch all */}
      <Route path="*" element={<MissingPage />} />
    </Routes>
  );
};

export default App;
