import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { toast } from "react-toastify";



function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);

    toast.success("Login successful");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {
    toast.error("Invalid credentials");
  }
};


 return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Welcome Back</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      <div className="auth-footer">
        Don't have an account? <a href="/">Register</a>
      </div>
    </div>
  </div>
);

}

export default Login;
