import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      Home
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
