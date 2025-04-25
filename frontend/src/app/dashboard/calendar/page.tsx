"use client";
import React, { useEffect, useState, useRef } from "react";
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

interface MonthPrediction {
  mes: string;
  anio: number;
  electricidad_uso: number;
  auto_uso: number;
  avion_uso: number;
  residuos_uso: number;
  agua_uso: number;
  emisiones_estimadas: number;
  clasificacion: string;
}

const datosPrueba: MonthPrediction[] = [
  {
    mes: "febrero",
    anio: 2025,
    electricidad_uso: 11800.0,
    auto_uso: 3223.33,
    avion_uso: 15,
    residuos_uso: 4530.33,
    agua_uso: 9747.67,
    emisiones_estimadas: 4860.726011404305,
    clasificacion: "medio",
  },
  {
    mes: "marzo",
    anio: 2025,
    electricidad_uso: 11500.0,
    auto_uso: 323.33,
    avion_uso: 15,
    residuos_uso: 4730.33,
    agua_uso: 9700.67,
    emisiones_estimadas: 4878.575908423359,
    clasificacion: "medio",
  },
  {
    mes: "abril",
    anio: 2025,
    electricidad_uso: 10500,
    auto_uso: 2800,
    avion_uso: 20,
    residuos_uso: 4300,
    agua_uso: 9000,
    emisiones_estimadas: 5109.638830377969,
    clasificacion: "alta",
  },
];

const TODOS_LOS_MESES = [
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

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [predicciones, setPredicciones] = useState<MonthPrediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleToggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleScroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleGenerate = async () => {
    if (selectedMonths.length === 0) {
      setError("Por favor selecciona al menos un mes");
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowCard(false);

    try {
      // Simulación de llamada API con datos de prueba
      // En producción, reemplazar con llamada real:
      // const response = await fetch('tu-endpoint-api', { ... });
      // const data = await response.json();

      // Simulamos un retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filtramos solo los meses seleccionados para la demo
      const filteredData = datosPrueba.filter((item) =>
        selectedMonths.includes(item.mes)
      );

      // Si no hay datos para los meses seleccionados, usamos datos genéricos
      const resultData =
        filteredData.length > 0
          ? filteredData
          : selectedMonths.map((month) => ({
              mes: month,
              anio: 2025,
              electricidad_uso: 10000 + Math.random() * 3000,
              auto_uso: 2000 + Math.random() * 2000,
              avion_uso: 10 + Math.floor(Math.random() * 15),
              residuos_uso: 4000 + Math.random() * 1000,
              agua_uso: 8000 + Math.random() * 4000,
              emisiones_estimadas: 4000 + Math.random() * 2000,
              clasificacion: ["baja", "medio", "alta"][
                Math.floor(Math.random() * 3)
              ],
            }));

      setPredicciones(resultData);
      setShowCard(true);
    } catch (err) {
      console.error("Error al generar predicción:", err);
      setError("Ocurrió un error al generar la predicción");
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = predicciones.map((p) => ({
    name: p.mes.charAt(0).toUpperCase() + p.mes.slice(1),
    co2: Number(p.emisiones_estimadas.toFixed(2)),
  }));

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  useEffect(() => {
    const foto = localStorage.getItem("foto");
    if (foto) {
      setFotoPerfil(foto);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0D] flex px-4">
      <Sidebar />

      <div className="flex flex-col w-full px-6 pt-6 text-white relative ml-8">
        {/* Perfil parte superior derecha */}
        <div className="flex justify-end pr-2 sm:pr-4 mb-4">
          <Image
            src={fotoPerfil || "/profile.png"}
            alt="Foto de perfil"
            width={40}
            height={40}
            className="rounded-full border border-white/20 object-cover"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
          Selecciona meses a predecir:
        </h1>
        <p className="text-sm sm:text-base text-[#D1D1D1] mb-6 font-light max-w-xs md:max-w-4xl pb-4">
          Elegí un rango de fechas para que la inteligencia artificial analice
          tus datos y genere una predicción sobre el impacto ambiental de tu
          empresa durante ese período.
        </p>

        {/* Slider de meses */}
        <div className="flex items-center gap-2 mb-6 pb-4 max-w-xs md:max-w-5xl">
          <div className="flex items-center">
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
              {TODOS_LOS_MESES.map((mes) => (
                <button
                  key={mes}
                  onClick={() => handleToggleMonth(mes)}
                  className={`min-w-[100px] h-[42px] cursor-pointer px-4 py-1 rounded-xl text-sm font-medium whitespace-nowrap transition 
                    ${
                      selectedMonths.includes(mes)
                        ? "bg-[#EA5105] text-white"
                        : "bg-[#2E2E2E] text-white hover:bg-[#3B3B3B]"
                    }`}
                >
                  {mes.charAt(0).toUpperCase() + mes.slice(1)}
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
        </div>

        {/* Botón Generar */}
        <div className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-[#EA5105] hover:bg-orange-600 text-white font-semibold px-10 py-2 rounded-xl cursor-pointer w-fit"
          >
            {isLoading ? "Generando..." : "Generar predicción"}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && <div className="mb-4 text-red-400">{error}</div>}

        {/* Spinner */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="mb-4 text-white text-base sm:text-lg">
              Generando predicción...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 md:h-32 md:w-32  md:border-[12px] border-[6px] border-[#7A2E09] border-t-[#EA5105]" />
          </div>
        )}

        {/* Resultados */}
        {showCard && (
          <div className="space-y-6">
            {/* Gráfico */}
            <div className="mt-10 bg-[#1C1D1F] rounded-xl shadow-lg p-6 max-w-sm md:max-w-4xl mb-4">
              <h3 className="text-xl font-semibold mb-2">Predicciones CO₂</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
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

            {/* Consejos */}
            <div className="bg-[#1C1D1F] p-4 rounded-xl shadow text-gray-300 max-w-xs md:max-w-4xl mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Consejos
              </h3>
              <ul className="space-y-2">
                <li>• Reduce el consumo de electricidad en horas pico</li>
                <li>• Considera usar transporte público o compartido</li>
                <li>• Optimiza tus viajes en avión combinando trayectos</li>
                <li>• Implementa un sistema de reciclaje adecuado</li>
                <li>
                  • Controla el consumo de agua con dispositivos ahorradores
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
