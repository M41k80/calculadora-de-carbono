"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Cardslider from "@/components/Cardslider";
import ScrollContainer from "@/components/Scrollcontainer";
import AiSuggestionsChat from "@/components/AiSuggestionsChat/AiSuggestionsChat";

const Dashboard = () => {
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [months, setMonths] = useState<any[]>([]);

  const handleGenerate = async () => {
    try {
      const response = await fetch("https://TU_BACKEND.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ months }),
      });

      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error al generar predicción:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex px-4">
      <Sidebar />
      <div className="w-full px-6 sm:px-10 pt-6 relative">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold text-white">Buenos días Karim</h1>
          <div className="flex justify-end pr-2 sm:pr-4">
            <Image
              src="/profile.png"
              alt="Perfil"
              className="rounded-full object-cover border border-white/20"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex gap-5">

          <div>
            <div className="gap-4 mt-4 flex flex-col items-center">
              <h1 className="mt-3">Genera una petición</h1>
              <Cardslider setMonths={setMonths} />

              <div
                onClick={handleGenerate}
                className="bg-black hover:bg-[#212226] border border-[#838383] h-8 mb-3 rounded-full w-50 text-[#EA5105] font-bold text-center cursor-pointer"
              >
                Generar Ahora
              </div>
            </div>

            <div className="font-bold my-4 mb-6">
              Resultado de la predicción:
              {predictionResult && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {predictionResult.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-xl">
                      <h3 className="text-lg font-bold">
                        {item.month} {item.year}
                      </h3>
                      <p className="text-sm mt-1">
                        Emisiones: {item.emissions} kg CO₂
                      </p>
                      <p className="text-xs text-green-400">{item.advice}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ScrollContainer />
          </div>
          <AiSuggestionsChat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
