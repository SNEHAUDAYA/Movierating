import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = form;

      if (!name || name.length < 3 || name.length > 30) {
        toast.error("Name should be 3 to 30 characters.");
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Email is invalid");
        return;
      }

      if (!password || password.length < 8 || password.length > 25) {
        toast.error("Password should be 8 to 25 characters.");
        return;
      }

      console.log(form);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        form
      );

      toast.success("Registration succesfull Login now.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message, {
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="main-signup-container">
        <div className="signup-form-container">
          <h2 className="heading">Sign Up</h2>
          <div className="hr-signup"></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-input"
            />

            <p className="account-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
