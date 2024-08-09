import React from "react";
import { useAuthDispatch } from "../services/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
