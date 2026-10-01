import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const fetchuser = localStorage.getItem("userinfo");
  const navigate = useNavigate();

  function handlelogout() {
    localStorage.removeItem("userinfo");
    navigate("/login");
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/patients">Patients</Link>

      {fetchuser ? (
        <button onClick={handlelogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;