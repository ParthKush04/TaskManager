import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { toast } from "react-toastify";


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/auth/register", form);

    toast.success("Registration successful");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
  }
};


 return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>

      <div className="auth-footer">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  </div>
);

}

export default Register;
