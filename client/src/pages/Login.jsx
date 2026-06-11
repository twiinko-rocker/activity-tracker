import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import '../styles/pages.css';

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validationErrors = useMemo(() => {
    const result = schema.safeParse(formData);
    if (!result.success) return result.error.flatten().fieldErrors;
    return {};
  }, [formData]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      const data = await response.json();
      setErrors({ server: data.message });
    }
  }, [formData, validationErrors, navigate]);

  return (
    <div className="page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email[0]}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password[0]}</p>}
        </div>
        {errors.server && <p>{errors.server}</p>}
        <button type="submit">Login</button>
        <p><span style={{ color: '#666', fontSize: '0.9rem' }}>
          Don't have an account? <a href="/register">Register here</a>
        </span></p>
      </form>
    </div>
  );
}

export default Login;