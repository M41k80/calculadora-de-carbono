"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const Terms = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0B0C] text-white flex flex-col items-center justify-center px-4 md:pt-[0px] pt-[110px]">
      {/* Fondo Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[220px] h-[230px] md:w-[350px] md:h-[370px] rounded-full bg-amber-600 opacity-70 md:blur-[70px] blur-[50px] mt-8" />
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
<div className="z-10 max-w-4xl text-left mt-2 md:mt-28 space-y-6 px-10 md:px-0 md:pb-8 pb-8">
  <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
    Términos y condiciones de uso
  </h1>
  <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-[#DDDDDD]">
    <li>
      <strong>Uso responsable:</strong> La plataforma está destinada exclusivamente a empresas que buscan gestionar y reducir su impacto ambiental. El uso indebido o con fines no relacionados queda prohibido.
    </li>
    <li>
      <strong>Privacidad de los datos:</strong> Todos los archivos y datos cargados por el usuario serán tratados con estricta confidencialidad y utilizados únicamente con fines de análisis dentro de la aplicación.
    </li>
    <li>
      <strong>Precisión de resultados:</strong> Las predicciones generadas se basan en algoritmos de aprendizaje automático. Si bien procuramos ofrecer estimaciones precisas, los resultados deben considerarse orientativos.
    </li>
    <li>
      <strong>Actualización de la información:</strong> El usuario se compromete a mantener actualizados sus datos personales y los archivos de emisiones para asegurar un análisis adecuado.
    </li>
    <li>
      <strong>Responsabilidad del usuario:</strong> Es responsabilidad del usuario verificar la exactitud de los datos cargados y asegurarse de que no contengan información errónea.
    </li>
    <li>
      <strong>Propiedad intelectual:</strong> Todos los elementos visuales, textos, íconos y herramientas de la plataforma son propiedad de la empresa desarrolladora. Está prohibida su reproducción sin autorización previa.
    </li>
    <li>
      <strong>Modificaciones del servicio:</strong> La aplicación podrá ser modificada o actualizada sin previo aviso, para mejorar la experiencia del usuario o adaptarse a nuevas normativas ambientales.
    </li>
    <li>
      <strong>Límites de responsabilidad:</strong> La empresa no será responsable por decisiones comerciales tomadas exclusivamente a partir de los resultados ofrecidos por la plataforma.
    </li>
    <li>
      <strong>Acceso y seguridad:</strong> El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda actividad realizada bajo su cuenta.
    </li>
    <li>
      <strong>Aceptación de términos:</strong> El uso de la aplicación implica la aceptación total de estos términos. La empresa se reserva el derecho de actualizar estos puntos en cualquier momento.
    </li>
  </ol>
</div>

    </div>
  );
};

export default Terms;
