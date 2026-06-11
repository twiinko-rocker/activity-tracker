import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.json();
      setErrors({ server: data.message });
    }
  }, [formData, validationErrors, navigate]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name[0]}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email[0]}</p>}
        </div>
        <div>
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
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

export default Register;