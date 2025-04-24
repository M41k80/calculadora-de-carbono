"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0B0C] text-white flex flex-col items-center justify-center px-4 md:pt-[0px] pt-[110px]">
      {/* Fondo Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[220px] h-[230px] md:w-[350px] md:h-[370px] rounded-full bg-amber-600 opacity-90 md:blur-[70px] blur-[50px] mt-8" />
      </div>

      {/* Header Navigation */}
      <header className="absolute top-1 left-0 right-0 z-20 px-10 flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="z-20">
          <Image
            src="/carboniq.png"
            alt="Logo"
            width={140}
            height={140}
            style={{ height: "auto" }}
          />
        </Link>

        {/* Flecha */}
        <Link href="/" className="z-20">
          <button className="text-white hover:text-gray-300 cursor-pointer">
            <ArrowLeft size={25} />
          </button>
        </Link>
      </header>

      {/* Contenido Principal */}
      <div className="z-10 w-full max-w-lg mx-auto rounded-2xl px-14 py-6 bg-black/70 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white space-y-4 mt-20 md:mt-20 mb-10">
        <h2 className="text-3xl font-semibold text-center text-[#E9E9E9] ">
          Contacto
        </h2>
        <p className="text-sm text-center text-gray-300 font-light leading-snug">
          ¿Tenés alguna duda o querés hablar con nuestro equipo? <br />
          Escribinos y te responderemos a la brevedad.
        </p>

        {/* Icono de correo */}
        <div className="flex justify-center">
          <Image src="/correo.png" alt="Email" width={90} height={90} />
        </div>

        <form className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white text-white placeholder:text-white outline-none"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white text-white placeholder:text-white outline-none"
            required
          />
          <input
            type="text"
            placeholder="Asunto"
            className="w-full px-4 py-2 rounded-md bg-transparent border border-white text-white placeholder:text-white outline-none"
            required
          />
          <div>
            <label className="text-sm text-white">Mensaje:</label>
            <textarea
              rows={5}
              className="w-full mt-1 px-4 py-2 rounded-md bg-transparent border border-white text-white placeholder:text-white outline-none"
              placeholder="Escribí tu mensaje acá..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-2 px-16 py-2 self-center rounded-2xl bg-[#EA5105] hover:bg-orange-700 text-white text-base font-semibold transition cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
