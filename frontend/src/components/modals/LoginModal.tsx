"use client";
import { X } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

const LoginModal = ({ isOpen, onClose, onOpenRegister }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div
        className="relative w-full max-w-md mx-auto rounded-2xl px-10 py-6
        bg-black/70 backdrop-blur-sm border border-white/10
        shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white"
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-xl font-medium text-center text-[#E9E9E9]">
          Ingresá a tu cuenta
        </h2>
        <p className="text-sm text-center text-gray-300 mt-1 mb-6 font-light">
          Accedé a la plataforma para empezar a medir y gestionar la huella de
          carbono de tu empresa.
        </p>

        {/* Redes sociales */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="hover:scale-105 transition">
            <svg
              width="35"
              height="35"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 0.75C12.5039 0.75 0.75 12.5039 0.75 27C0.75 41.4961 12.5039 53.25 27 53.25C41.4961 53.25 53.25 41.4961 53.25 27C53.25 12.5039 41.4961 0.75 27 0.75ZM36.7852 37.875C34.4062 40.0664 31.1602 41.3555 27.2871 41.3555C21.6797 41.3555 16.8281 38.1387 14.4668 33.4512C13.4941 31.5117 12.9375 29.3203 12.9375 27C12.9375 24.6797 13.4941 22.4883 14.4668 20.5488C16.8281 15.8555 21.6797 12.6387 27.2871 12.6387C31.1543 12.6387 34.4004 14.0625 36.8906 16.377L32.7773 20.4961C31.2891 19.0723 29.3965 18.3516 27.293 18.3516C23.5547 18.3516 20.3906 20.877 19.2598 24.2695C18.9727 25.1309 18.8086 26.0508 18.8086 27C18.8086 27.9492 18.9727 28.8691 19.2598 29.7305C20.3906 33.123 23.5547 35.6484 27.2871 35.6484C29.2207 35.6484 30.8613 35.1387 32.1445 34.2773C33.668 33.2578 34.6758 31.7402 35.0098 29.9414H27.2871V24.3867H40.8047C40.9746 25.3301 41.0625 26.3086 41.0625 27.3223C41.0625 31.6992 39.498 35.373 36.7852 37.875Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="hover:scale-105 transition">
            <svg
              width="31"
              height="31"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.5 0.5C41.8261 0.5 43.0979 1.02678 44.0355 1.96447C44.9732 2.90215 45.5 4.17392 45.5 5.5V40.5C45.5 41.8261 44.9732 43.0979 44.0355 44.0355C43.0979 44.9732 41.8261 45.5 40.5 45.5H5.5C4.17392 45.5 2.90215 44.9732 1.96447 44.0355C1.02678 43.0979 0.5 41.8261 0.5 40.5V5.5C0.5 4.17392 1.02678 2.90215 1.96447 1.96447C2.90215 1.02678 4.17392 0.5 5.5 0.5H40.5ZM39.25 39.25V26C39.25 23.8385 38.3913 21.7655 36.8629 20.2371C35.3345 18.7087 33.2615 17.85 31.1 17.85C28.975 17.85 26.5 19.15 25.3 21.1V18.325H18.325V39.25H25.3V26.925C25.3 25 26.85 23.425 28.775 23.425C29.7033 23.425 30.5935 23.7937 31.2499 24.4501C31.9063 25.1065 32.275 25.9967 32.275 26.925V39.25H39.25ZM10.2 14.4C11.3139 14.4 12.3822 13.9575 13.1698 13.1698C13.9575 12.3822 14.4 11.3139 14.4 10.2C14.4 7.875 12.525 5.975 10.2 5.975C9.07946 5.975 8.00482 6.42013 7.21247 7.21247C6.42013 8.00482 5.975 9.07946 5.975 10.2C5.975 12.525 7.875 14.4 10.2 14.4ZM13.675 39.25V18.325H6.75V39.25H13.675Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="hover:scale-105 transition">
            <svg
              width="35"
              height="35"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 25C50 11.2 38.8 0 25 0C11.2 0 0 11.2 0 25C0 37.1 8.6 47.175 20 49.5V32.5H15V25H20V18.75C20 13.925 23.925 10 28.75 10H35V17.5H30C28.625 17.5 27.5 18.625 27.5 20V25H35V32.5H27.5V49.875C40.125 48.625 50 37.975 50 25Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-4">
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
            <label className="block text-sm font-normal mb-1 text-[#E9E9E9]">
              Contraseña:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black outline-none placeholder:text-gray-600"
              placeholder="●●●●●●"
            />
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            className="mt-4 px-10 py-1 self-center rounded-2xl border-2 border-[#838383] text-[#EA5105] font-semibold hover:bg-orange-600 hover:text-white transition cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace a registro */}
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
