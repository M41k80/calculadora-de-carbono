"use client";
import React, { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import SuccessModal from "@/components/modals/SuccessModal";

const CargaData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setIsLoading(true);
    setShowSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 3000);
  };

  const handleReset = () => {
    setShowSuccess(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file.name);
      // Aquí podrías validar, mostrar nombre, o enviar a backend
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0D] flex">
      <Sidebar />
      <div className="flex flex-col w-full px-6 sm:px-10 pt-6 relative">
        {/* Imagen de perfil */}
        <div className="flex justify-end pr-2 sm:pr-4">
          <Image
            src="/profile.png"
            alt="Perfil"
            className="rounded-full object-cover border border-white/20"
            width={40}
            height={40}
          />
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="flex-1 flex flex-col justify-center items-center text-white">
            <p className="mb-6 text-xl font-normal text-white">
              Cargando y analizando datos
            </p>
            <div className="animate-spin rounded-full h-40 w-40 border-[12px] border-[#7A2E09] border-t-[#EA5105]" />
          </div>
        ) : showSuccess ? (
          <SuccessModal onClose={handleReset} />
        ) : (
          // Formulario de carga de datos
          <div className="flex flex-col justify-start items-start w-full max-w-2xl mx-auto text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Carga de datos
            </h1>
            <p className="text-[#B1B1B1] mb-6 text-sm sm:text-base font-light">
              Adjuntá un archivo para cargar tus datos de emisiones
            </p>

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-[#3f3f3f] rounded-xl w-full max-w-[680px] h-[260px] sm:h-[300px] bg-[#0B0C0D] flex flex-col justify-center items-center gap-4">
              <Image
                src="/upload.png"
                alt="upload"
                className="object-cover"
                width={60}
                height={60}
              />
              <p className="text-sm sm:text-base text-white font-light text-center px-4">
                Arrastrá y soltá el archivo aquí o
              </p>

              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".csv,.scsv,.txt,.xls,.xlsx"
                />
                <button
                  onClick={handleFileClick}
                  className="bg-[#202226] hover:bg-[#2a2a2a] text-white px-6 py-2 rounded-md text-sm transition cursor-pointer"
                >
                  Seleccionar archivo
                </button>
              </>
            </div>

            {/* Informacion adicional */}
            <p className="text-sm sm:text-base text-[#B1B1B1] mt-4 leading-relaxed font-light">
              Archivos admitidos: .SCSV (Transporte, electricidad, gas, agua,
              vuelos y todos los necesarios para el cálculo)
            </p>

            {/* Botón Enviar */}
            <div className="mt-6">
              <button
                className="bg-[#EA5105] hover:bg-orange-700 text-white font-semibold py-2 px-10 rounded-lg shadow-md transition duration-200 cursor-pointer"
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargaData;
