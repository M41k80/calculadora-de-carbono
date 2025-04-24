"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

const Hero = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleOpenLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleOpenRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0B0C] text-white flex flex-col items-center justify-center px-4 md:pt-[0px] pt-[110px]">
      {/* Fondo Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[220px] h-[230px] md:w-[350px] md:h-[370px] rounded-full bg-amber-600 opacity-70 md:blur-[70px] blur-[50px] mt-8" />
      </div>

      {/* Header Navigation */}
      <header className="absolute top-1 left-0 right-0 z-20 px-6 pointer-events-auto">
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 bg-transparent">
          <div className="flex justify-center sm:justify-start z-20">
            <Image
              src="/carboniq.png"
              alt="Logo"
              width={140}
              height={140}
              style={{ height: "auto" }}
            />
          </div>

          <div className="text-center sm:text-left z-20">
            <Link
              href="/terms"
              className="hover:underline text-lg font-medium text-[#E9E9E9]"
            >
              Términos
            </Link>
          </div>

          <div className="text-center sm:text-right z-20">
            <Link
              href="/contact"
              className="border-2 border-[#838383] text-[#E9E9E9] px-8 py-1 rounded-lg text-lg hover:bg-white hover:text-black transition"
            >
              Contacto
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="z-10 max-w-4xl text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 mt-32 text-[#DDDDDD]">
          Calculá tu huella <br />
          <span className="text-[#DDDDDD]">y transformá tu impacto</span>
        </h1>
        <p className="text-base md:text-lg text-[#B5B5B5] mb-10  md:mb-20 mt-6 font-normal">
          Descubrí una forma simple y precisa de conocer el impacto ambiental{" "}
          <br className="hidden md:block" />
          de tu empresa y convertir datos en decisiones.
        </p>

        <button
          onClick={handleOpenLogin}
          className="inline-flex font-inter items-center gap-2 bg-[#EA5105] hover:bg-orange-700 text-white font-normal px-4 py-3 rounded-2xl transition shadow-lg cursor-pointer"
        >
          Comencemos <ChevronRight className="w-9 h-5" />
        </button>
      </div>

      {/* Modal de Login */}
      <LoginModal
        isOpen={showLogin}
        onClose={handleCloseModals}
        onOpenRegister={handleOpenRegister}
      />

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={showRegister}
        onClose={handleCloseModals}
        onBackToLogin={handleOpenLogin}
      />
    </div>
  );
};

export default Hero;
