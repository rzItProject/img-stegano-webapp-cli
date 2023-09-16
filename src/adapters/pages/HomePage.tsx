import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      Home
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
