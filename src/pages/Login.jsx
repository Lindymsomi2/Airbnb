import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import Navbar from "../components/Navbar/Navbar";
import Button  from "../components/Button"

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let data;
      if (isRegister) {
        if (!form.username || !form.email || !form.password) {
          throw new Error("All fields are required");
        }
        data = await api.register(form.username, form.email, form.password);
      } else {
        if (!form.email || !form.password) {
          throw new Error("Email and password are required");
        }
        data = await api.login(form.email, form.password);
      }

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="card shadow border-0 p-4"
          style={{ maxWidth: "420px", width: "100%" }}
        >
          <h2 className="text-center fw-bold mb-4">
            {isRegister ? "Sign up" : "Log in"}
          </h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
              />
            </div>
           <Button className="w-100 mt-4" color="primary" type="submit">
          Login
        </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
