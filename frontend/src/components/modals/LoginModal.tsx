"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import axios from "axios";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

const LoginModal = ({ isOpen, onClose, onOpenRegister }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // <- hook para redirigir

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://calculadora-de-carbono-1rzt.onrender.com/api/v1/auth/login",
        { email, password }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      onClose();
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md mx-auto rounded-2xl px-10 py-6 bg-black/70 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-medium text-center text-[#E9E9E9]">
          Ingresá a tu cuenta
        </h2>
        <p className="text-sm text-center text-gray-300 mt-1 mb-6 font-light">
          Accedé a la plataforma para empezar a medir y gestionar la huella de
          carbono de tu empresa.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {/* Botones de redes */}
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal mb-1 text-[#E9E9E9]">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-normal mb-1 text-[#E9E9E9]">
              Contraseña:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-10 py-1 self-center rounded-2xl border-2 border-[#838383] text-[#EA5105] font-semibold hover:bg-orange-600 hover:text-white transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-[#E9E9E9] font-normal">
          ¿Todavía no tenés cuenta?{" "}
          <span
            onClick={onOpenRegister}
            className="text-[#EA5105] font-semibold hover:underline cursor-pointer"
          >
            Registrarme
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
