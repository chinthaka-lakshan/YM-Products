import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RepDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "sales_rep") {
      navigate("/login");
    }
  }, []);

  return <h2>Welcome, Sales Representative!</h2>;
};

export default RepDashboard;
