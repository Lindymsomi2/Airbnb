import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      
      {/* <nav className="bg-white border-bottom px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h5
              className="fw-bold mb-0"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              airbnb
            </h5>
            <small className="text-muted">Admin Panel</small>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="text-muted small">
              Logged in as {user?.username}
            </span>

           

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>

        </div>
      </nav> */}

      {/* Main content */}
      <main className="container-fluid px-4 py-4">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;