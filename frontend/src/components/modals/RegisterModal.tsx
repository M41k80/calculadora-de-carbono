"use client";
import { X, ArrowLeft } from "lucide-react";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
};

const RegisterModal = ({
  isOpen,
  onClose,
  onBackToLogin,
}: RegisterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className="relative w-full max-w-md mx-auto rounded-2xl px-10 py-6
        bg-black/70 backdrop-blur-sm border border-white/10
        shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white pointer-events-auto"
      >
        {/* Botones de navegación */}
        <button
          onClick={onBackToLogin}
          className="absolute top-4 left-4 text-white hover:text-gray-300 transition cursor-pointer"
          aria-label="Volver al login"
        >
          <ArrowLeft size={22} />
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-xl font-medium text-center text-[#E9E9E9]">
          Creá tu cuenta gratis
        </h2>
        <p className="text-sm text-center text-gray-300 mt-1 mb-6 font-light">
          Unite a la plataforma y comenzá a calcular el impacto ambiental de tu
          empresa en minutos.
        </p>

        {/* Formulario de registro */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal mb-1 text-[#E9E9E9]">
              Nombre completo:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-normal mb-1 text-[#E9E9E9]">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="tuemail@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-[#E9E9E9]">
              Contraseña:
            </label>
            <p className="text-xs text-gray-400 mb-1">Mínimo 6 caracteres</p>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="●●●●●●"
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-[#E9E9E9]">
              Confirmar contraseña:
            </label>
            <p className="text-xs text-gray-400 mb-1">Repetí tu contraseña</p>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="●●●●●●"
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="mt-4 px-10 py-1 self-center rounded-2xl border-2 border-[#838383] text-[#EA5105] font-semibold hover:bg-orange-600 hover:text-white transition cursor-pointer"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
