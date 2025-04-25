"use client";
import React, { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import SuccessModal from "@/components/modals/SuccessModal";
import { getAnnualPrediction } from "@/api/prediccion/predictionsAnual";

const CargaData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      console.log("Archivo seleccionado:", file.name);
    }
  };

  const handleSubmit = async () => {
    if (!csvFile) {
      setError("Por favor seleccione un archivo");
      return;
    }

    setIsLoading(true);
    setShowSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("csv", csvFile);

    try {
      // se usa para obtener la prediccion
      const data = await getAnnualPrediction(formData);

      // se usa para guardar el historial en la base de datos de supabase
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/historial/save", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email, 
          detalle_mensual: data.detalle_mensual,
          resumen_anual: data.resumen_anual,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido o expirado');
        }
        throw new Error('Error al guardar el historial');
      }

      setShowSuccess(true);
    } catch (error: unknown) {
      setError(`Hubo un error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setCsvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0D] flex px-4">
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

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-md w-full">
                {error}
              </div>
            )}

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-[#3f3f3f] rounded-xl w-full max-w-[680px] h-[260px] sm:h-[300px] bg-[#0B0C0D] flex flex-col justify-center items-center gap-4">
              {csvFile ? (
                <>
                  <Image
                    src="/file-selected.png" 
                    alt="Archivo seleccionado"
                    className="object-cover"
                    width={60}
                    height={60}
                  />
                  <p className="text-sm sm:text-base text-white font-light text-center px-4">
                    Archivo seleccionado: {csvFile.name}
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}

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
                {csvFile ? "Cambiar archivo" : "Seleccionar archivo"}
              </button>
            </div>

            {/* Informacion adicional */}
            <p className="text-sm sm:text-base text-[#B1B1B1] mt-4 leading-relaxed font-light">
              Archivos admitidos: .SCSV (Transporte, electricidad, gas, agua,
              vuelos y todos los necesarios para el cálculo)
            </p>

            {/* Botón Enviar */}
            <div className="mt-6">
              <button
                className={`bg-[#EA5105] hover:bg-orange-700 text-white font-semibold py-2 px-10 rounded-lg shadow-md transition duration-200 cursor-pointer ${!csvFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={!csvFile}
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