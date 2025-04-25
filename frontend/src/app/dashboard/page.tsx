"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Cardslider from "@/components/Cardslider";
import AiSuggestionsChat from "@/components/AiSuggestionsChat/AiSuggestionsChat";

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
  predicciones?: MonthPrediction[];
  consejos?: string;
}

export default function Dashboard() {
  const [predicciones, setPredicciones] = useState<MonthPrediction[]>([]);
  const [consejos, setConsejos] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState<string | null>(null);

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

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://calculadora-carbono-7ero.onrender.com/predict/future/?meses=${selectedCount}`;

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
      setPredicciones(data.predicciones || []);
      setConsejos(data.consejos || "");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white text-center sm:text-left">
            Buenos días Karim
          </h1>
          <Image
            src="/profile.png"
            alt="Perfil"
            width={40}
            height={40}
            className="rounded-full border border-white/20"
          />
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <h2 className="text-white font-medium text-center sm:text-left">
            Selecciona meses a predecir
          </h2>
          <Cardslider onChange={(seleccionados) => setSelectedCount(seleccionados.length)} />

          <button
            onClick={handleGenerate}
            disabled={loading || selectedCount === 0}
            className="px-6 py-2 bg-[#212226] hover:bg-zinc-700 text-[#EA5105] font-bold rounded-full disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar Ahora"}
          </button>
        </div>

        <div className="text-white space-y-4">
          <h3 className="font-semibold">Resultado de la predicción:</h3>
          {predicciones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {predicciones.map((p, i) => (
                <div key={i} className="bg-gray-900 p-4 rounded-xl">
                  <h4 className="text-lg font-bold">
                    {p.mes.charAt(0).toUpperCase() + p.mes.slice(1)} {p.anio}
                  </h4>
                  <p className="mt-1 text-gray-300">
                    Emisiones estimadas: {p.emisiones_estimadas.toFixed(2)} kg CO₂
                  </p>
                  <p className="mt-2 text-green-400">Clasificación: {p.clasificacion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aún no se han generado predicciones.</p>
          )}

          {consejos && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg text-gray-300 whitespace-pre-line">
              <h4 className="text-white font-semibold mb-2">Consejos:</h4>
              {consejos}
            </div>
          )}
        </div>

        <div className="mt-10">
          <AiSuggestionsChat />
        </div>
      </div>
    </div>
  );
}
