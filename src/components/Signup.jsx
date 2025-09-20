import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "./AuthForms.css"; // pure CSS

export default function Signup() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://mytube-b-j4ny.onrender.com/api/auth/register", form);
    alert("User registered! Please login.");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Sign Up</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="auth-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="auth-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="auth-input"
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  );
}
