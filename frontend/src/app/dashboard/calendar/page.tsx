"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([
    "abril",
    "mayo",
    "junio",
  ]);

  const months = [
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "Agosto",
    "Septiembre",
    "Octubre",
  ];

  const handleToggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setShowCard(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowCard(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0D] flex px-4">
      <Sidebar />

      <div className="flex flex-col w-full px-6 pt-10 text-white">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
          Selecciona una fecha:
        </h1>
        <p className="text-sm sm:text-base text-[#D1D1D1] mb-6 font-light max-w-xl">
          Elegí un rango de fechas para que la inteligencia artificial analice
          tus datos y genere una predicción sobre el impacto ambiental de tu
          empresa durante ese período.
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xl font-semibold">&lt;</span>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => handleToggleMonth(month)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition 
                ${
                  selectedMonths.includes(month)
                    ? "bg-[#EA5105] text-white"
                    : "bg-[#2E2E2E] text-white hover:bg-[#3B3B3B]"
                }`}
            >
              {month}
            </button>
          ))}
          <span className="text-xl font-semibold">&gt;</span>
        </div>

        <button
          onClick={handleGenerate}
          className="bg-[#EA5105] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer w-fit"
        >
          Generar
        </button>

        {/* Loader */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="mb-4 text-white text-base sm:text-lg">
              Cargando análisis...
            </p>
            <div className="animate-spin rounded-full h-32 w-32 border-[12px] border-[#7A2E09] border-t-[#EA5105]" />
          </div>
        )}

        {/* Card con resultado */}
        {showCard && (
          <div className="mt-10 bg-[#1C1D1F] rounded-xl shadow-lg p-6 max-w-3xl w-full">
            <h2 className="text-xl font-semibold mb-2">
              Resultado del análisis
            </h2>
            <p className="text-sm text-[#B1B1B1]">
              Aquí aparecerá tu gráfico de predicciones basado en los meses
              seleccionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
