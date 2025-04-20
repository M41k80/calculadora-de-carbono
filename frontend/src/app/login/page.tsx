"use client";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Ingresa un correo válido.";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Intentando login con:", { email, password });
    // Aquí conexion con API de Login
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full text-gray-600 mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.email ? "border-red-500 ring-red-500" : ""
              }`}
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full text-gray-600 mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.password ? "border-red-500 ring-red-500" : ""
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
