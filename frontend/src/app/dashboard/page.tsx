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

interface PredictionResponse {
  predicciones: MonthPrediction[];
  consejos: string;
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
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [predicciones, setPredicciones] = useState<MonthPrediction[]>([]);
  const [consejos, setConsejos] = useState<string>("");
  const [error, setError] = useState<string|null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleToggleMonth = (mes: string) => {
    setSelectedMonths(prev =>
      prev.includes(mes) ? prev.filter(m=>m!==mes) :
      prev.length < 12 ? [...prev, mes] : prev
    );
  };

  const handleScroll = (dir: "left"|"right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir==="left"? -200: 200, behavior: "smooth" });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setShowCard(false);

    try {
      
      const url = `https://calculadora-carbono-7ero.onrender.com/predict/future/?meses=${selectedMonths.length}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify(datosPrueba),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error ${res.status}: ${errText}`);
      }

      const data: PredictionResponse = await res.json();
      setPredicciones(data.predicciones);
      setConsejos(data.consejos);
      setShowCard(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  
  const chartData = predicciones.map(p => ({
    name: p.mes.charAt(0).toUpperCase() + p.mes.slice(1),
    co2: Number(p.emisiones_estimadas.toFixed(2)),
  }));

  return (
    <div className="min-h-screen flex bg-[#0B0C0D]">
      <Sidebar />

      <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-semibold">Impacto Ambiental</h1>
          <Image
            src="/profile.png"
            alt="Perfil"
            width={40}
            height={40}
            className="rounded-full border border-white/20"
          />
        </div>

        {/* Slider de meses */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Selecciona meses a predecir</h2>
          <div className="flex items-center">
            <button onClick={()=>handleScroll("left")} className="px-2">‹</button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-2 snap-x scrollbar-thin scrollbar-thumb-gray-600"
            >
              {TODOS_LOS_MESES.map(mes => (
                <button
                  key={mes}
                  onClick={()=>handleToggleMonth(mes)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl whitespace-nowrap 
                    ${selectedMonths.includes(mes)
                      ? "bg-[#EA5105] text-white"
                      : "bg-[#2E2E2E] text-white hover:bg-[#3B3B3B]"}`}
                >
                  {mes.charAt(0).toUpperCase()+mes.slice(1)}
                </button>
              ))}
            </div>
            <button onClick={()=>handleScroll("right")} className="px-2">›</button>
          </div>
        </div>

        {/* Botón Generar */}
        <div className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={isLoading || selectedMonths.length===0}
            className="px-6 py-2 bg-[#EA5105] hover:bg-orange-600 rounded-full font-semibold disabled:opacity-50"
          >
            {isLoading ? "Generando..." : "Generar Predicción"}
          </button>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-red-400">{error}</div>}

        {/* Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600" />
            <p className="mt-2">Procesando...</p>
          </div>
        )}

        {/* Resultados */}
        {showCard && (
          <div className="space-y-6">
            {/* Gráfico */}
            <div className="bg-[#1C1D1F] p-4 rounded-xl shadow">
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
                    <Bar dataKey="co2" radius={[4,4,0,0]} shape={<CustomBarShape />} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Consejos */}
            {consejos && (
              <div className="bg-[#1C1D1F] p-4 rounded-xl shadow text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">Consejos</h3>
                <div className="whitespace-pre-line">{consejos}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
