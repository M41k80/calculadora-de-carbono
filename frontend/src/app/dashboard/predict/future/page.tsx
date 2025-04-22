"use client";

import { useState } from "react";
import { obtenerPrediccionFutura, ConsumoMensual } from "@/api/prediccion/predictionFuture";

const MESES = [
    "enero", "febrero", "marzo", "abril",
    "mayo", "junio", "julio", "agosto",
    "septiembre", "octubre", "noviembre", "diciembre"
];

export default function PrediccionForm() {
    const [mesesSeleccionados, setMesesSeleccionados] = useState<string[]>([]);
    const [resultado, setResultado] = useState<ConsumoMensual[] | null>(null);
    const [consejos, setConsejos] = useState<string | null>(null);

    const historial: ConsumoMensual[] = [
        {
            mes: "abril",
            anio: 2023,
            electricidad_uso: 1100.0,
            auto_uso: 323.33,
            avion_uso: 1,
            residuos_uso: 473.33,
            agua_uso: 97.67,
            emisiones_estimadas: 4200.25,
            clasificacion: "medio",
        },
        {
            mes: "mayo",
            anio: 2023,
            electricidad_uso: 1100.0,
            auto_uso: 323.33,
            avion_uso: 1,
            residuos_uso: 473.33,
            agua_uso: 97.67,
            emisiones_estimadas: 4200.25,
            clasificacion: "medio",
        },
        {
            mes: "junio",
            anio: 2023,
            electricidad_uso: 1100.0,
            auto_uso: 323.33,
            avion_uso: 1,
            residuos_uso: 473.33,
            agua_uso: 97.67,
            emisiones_estimadas: 4200.25,
            clasificacion: "medio",
        },
    ];

    const toggleMes = (mes: string) => {
        setMesesSeleccionados((prev) =>
            prev.includes(mes)
                ? prev.filter((m) => m !== mes)
                : prev.length < 12
                    ? [...prev, mes]
                    : prev
        );
    };

    const handleSubmit = async () => {
        try {
            const respuesta = await obtenerPrediccionFutura(mesesSeleccionados.length, historial);

            if (Array.isArray(respuesta.predicciones)) {
                setResultado(respuesta.predicciones);
                setConsejos(respuesta.consejos || null);
            } else {
                console.error("Respuesta inválida:", respuesta);
                setResultado(null);
                setConsejos(null);
            }
        } catch (error) {
            alert(`Error al obtener la predicción: ${error}`);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-xl max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Selecciona hasta 12 meses para predecir:</h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                {MESES.map((mes) => (
                    <button
                        key={mes}
                        onClick={() => toggleMes(mes)}
                        className={`px-3 py-2 rounded-lg border text-sm capitalize transition-colors duration-200 ${mesesSeleccionados.includes(mes)
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        {mes}
                    </button>
                ))}
            </div>

            <p className="mb-2 text-sm">
                Meses seleccionados:{" "}
                <span className="font-semibold text-green-400">
                    {mesesSeleccionados.join(", ") || "ninguno"}
                </span>
            </p>

            <button
                onClick={handleSubmit}
                disabled={mesesSeleccionados.length === 0}
                className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:bg-gray-500"
            >
                Obtener predicción
            </button>

            {resultado && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Resultados de la predicción</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {resultado.map((item, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                                <h4 className="text-lg font-bold capitalize mb-2">{item.mes} {item.anio}</h4>
                                <p><strong>Electricidad:</strong> {item.electricidad_uso} kWh</p>
                                <p><strong>Auto:</strong> {item.auto_uso} km</p>
                                <p><strong>Avión:</strong> {item.avion_uso} vuelos</p>
                                <p><strong>Residuos:</strong> {item.residuos_uso} kg</p>
                                <p><strong>Agua:</strong> {item.agua_uso} m³</p>
                                <p><strong>Emisiones:</strong> {item.emisiones_estimadas.toFixed(2)} kg CO₂</p>
                                <p><strong>Clasificación:</strong> <span className="capitalize">{item.clasificacion}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {consejos && (
                <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Consejos personalizados</h3>
                    <pre className="whitespace-pre-wrap text-sm text-green-300">{consejos}</pre>
                </div>
            )}
        </div>
    );
}
