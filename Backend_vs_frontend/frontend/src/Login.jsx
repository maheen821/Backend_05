import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email:"", password:"" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      Swal.fire("Warning", "Enter email & password", "warning");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", loginForm);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      Swal.fire("Success", "Login successful", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Invalid credentials", "error");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
