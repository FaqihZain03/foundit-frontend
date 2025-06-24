import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import { loginAdmin } from "../../_services/auth";

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 
  
    try {
      const res = await loginAdmin({ email, password });
      console.log("Login success", res);
  
      localStorage.setItem("token", res.token); 
      localStorage.setItem("userInfo", JSON.stringify(res.user));
  
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Email atau password salah.");
    }
  };
  

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
