import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { email, password, name } = formData;
    if (!email || !password || (!isLogin && !name)) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 6) return false;
    if (!isLogin) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (name.trim().length < 3 || !nameRegex.test(name.trim())) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Invalid input. Please check all fields.");
      return;
    }

    setLoading(true);
    try {
      const trimmedEmail = formData.email.trim().toLowerCase();
      const trimmedPassword = formData.password;

      if (isLogin) {
        const adminRes = await axios.get("http://localhost:3000/Admin");
        const admin = adminRes.data.find(
          (a) =>
            a.email.trim().toLowerCase() === trimmedEmail &&
            a.password === trimmedPassword
        );

        if (admin) {
  const adminUser = { ...admin, role: 'admin' };
  login(adminUser);  // sets user in context
  localStorage.setItem('user', JSON.stringify(adminUser));  // persists in localStorage
  navigate('/admin/dashboard');
  return;
}


    
        const userRes = await axios.get("http://localhost:3000/users");
        const users = userRes.data;
        const user = users.find(
          (u) =>
            u.email.trim().toLowerCase() === trimmedEmail &&
            u.password === trimmedPassword
        );

        if (user) {
          const normalUser = { ...user, role: "user" };
          login(normalUser); // <-- Only this to update context & localStorage
          setFormData({ name: "", email: "", password: "" });
          navigate("/");
        } else {
          alert("Invalid credentials. Please sign up.");
          setIsLogin(false);
        }
      } else {
        // Signup flow
        const response = await axios.get("http://localhost:3000/users");
        const existingUser = response.data.find(
          (u) => u.email.trim().toLowerCase() === trimmedEmail
        );
        if (existingUser) {
          alert("User already exists. Please log in.");
          setIsLogin(true);
        } else {
          const newUser = {
            name: formData.name.trim(),
            email: trimmedEmail,
            password: trimmedPassword,
            cart: [],
            order: [],
          };
          await axios.post("http://localhost:3000/users", newUser);
          alert("Registration successful! Please log in.");
          setFormData({ name: "", email: "", password: "" });
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
