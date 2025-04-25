"use client";

import React, { useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomBarShape from "@/components/CustomBarShape";

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([
    "abril",
    "mayo",
    "junio",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const chartData = [
    { name: "A", co2: 120 },
    { name: "B", co2: 90 },
    { name: "C", co2: 110 },
  ];

  const handleToggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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

      <div className="flex flex-col w-full px-6 pt-6 text-white relative ml-8">
        {/* Perfil parte superior derecha */}
        <div className="flex justify-end pr-2 sm:pr-4 mb-4">
          <Image
            src="/profile.png"
            alt="Perfil"
            className="rounded-full object-cover border border-white/20"
            width={40}
            height={40}
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
          Selecciona una fecha:
        </h1>
        <p className="text-sm sm:text-base text-[#D1D1D1] mb-6 font-light max-w-xs md:max-w-4xl pb-4">
          Elegí un rango de fechas para que la inteligencia artificial analice
          tus datos y genere una predicción sobre el impacto ambiental de tu
          empresa durante ese período.
        </p>

        {/* Slider horizontal con flechas como imagen */}
        <div className="flex items-center gap-2 mb-6 pb-4 max-w-xs md:max-w-5xl">
          {/* Botón izquierda */}
          <button
            onClick={() => handleScroll("left")}
            className="md:w-3 md:h-3 w-20 h-20 flex items-center justify-center cursor-pointer mr-5 ml-3"
          >
            <Image
              src="/flecha.png"
              alt="Anterior"
              width={10}
              height={10}
              className="object-contain"
            />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-hidden gap-3 max-w-[850px] scroll-smooth"
          >
            {months.map((month) => (
              <button
                key={month}
                onClick={() => handleToggleMonth(month)}
                className={`min-w-[100px] h-[42px] cursor-pointer px-4 py-1 rounded-xl text-sm font-medium whitespace-nowrap transition
                  ${
                    selectedMonths.includes(month)
                      ? "bg-[#EA5105] text-white"
                      : "bg-[#2E2E2E] text-white hover:bg-[#3B3B3B]"
                  }`}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Botón derecha */}
          <button
            onClick={() => handleScroll("right")}
            className="md:w-3 md:h-3 w-20 h-20 flex items-center justify-center cursor-pointer mx-5"
          >
            <Image
              src="/flecha.png"
              alt="Siguiente"
              width={10}
              height={10}
              className="object-contain rotate-180"
            />
          </button>
        </div>

        {/* Botón generar */}
        <button
          onClick={handleGenerate}
          className="bg-[#EA5105] hover:bg-orange-600 text-white font-semibold px-10 py-2 rounded-xl cursor-pointer w-fit"
        >
          Generar
        </button>

        {/* Spinner */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="mb-4 text-white text-base sm:text-lg">
              Cargando análisis...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 md:h-32 md:w-32  md:border-[12px] border-[6px] border-[#7A2E09] border-t-[#EA5105]" />
          </div>
        )}

        {/* Card de resultado */}
        {showCard && (
          <div className="mt-10 bg-[#1C1D1F] rounded-xl shadow-lg p-6 max-w-sm md:max-w-4xl mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Resultado del análisis
            </h2>
            <p className="text-sm text-[#B1B1B1] mb-4">
              Aquí se mostrará tu gráfico basado en los meses seleccionados.
            </p>

            {/* Gráfico */}
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#ccc" tick={false} />
                  <YAxis stroke="#ccc" tick={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#EA5105" }}
                  />
                  <Bar
                    dataKey="co2"
                    radius={[4, 4, 0, 0]}
                    shape={<CustomBarShape />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
