import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = (props) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) navigate("/login");

  return <div>This is Home Page</div>;
};

export default Home;
