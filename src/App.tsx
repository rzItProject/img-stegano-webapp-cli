import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavBar from "./adapters/components/main/NavBar";
import Home from "./adapters/pages/HomePage";
import LoadingScreen from "./adapters/pages/LoadingPage";
import RegisterPage from "./adapters/pages/RegisterPage";
import LoginPage from "./adapters/pages/LoginPage";
import { ProtectedRoute } from "./adapters/components/ProtectedRoute";
import MissingPage from "./adapters/pages/MissingPage";
import SignUpPage from "./adapters/pages/SignUpPage";

const App: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Vérifiez l'état d'authentification lorsque l'application se charge
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const showNavbar = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}{" "}
      {/* Affichez la barre de navigation si nécessaire */}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
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
    </>
  );
};

export default App;
