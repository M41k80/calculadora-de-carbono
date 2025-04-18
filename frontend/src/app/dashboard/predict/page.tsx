"use client"

import { useState } from "react"
import { getEmissionsPrediction } from "@/app/utils/api/predictions"

export default function PredictionPage() {
    const [data, setData] = useState({
        electricidad_uso: 0,
        auto_uso: 0,
        avion_uso: 0,
        residuos_uso: 0,
        agua_uso: 0,
    })
    interface EmissionsPrediction {
        emisiones_estimadas: number
        clasificacion: string
        consejos: string
    }

    const [prediction, setPrediction] = useState<EmissionsPrediction | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: parseFloat(e.target.value),
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const result = await getEmissionsPrediction(data)
            setPrediction(result);
        } catch (error) {
            setError(`Hubo un error al obtener la predicción.${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Predicción de Emisiones</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Uso de electricidad (kWh)</label>
                    <input
                        type="number"
                        name="electricidad_uso"
                        value={data.electricidad_uso}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block">Uso de automóvil (km)</label>
                    <input
                        type="number"
                        name="auto_uso"
                        value={isNaN(data.auto_uso) ? '' : data.auto_uso}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block">Uso de avión (vuelos)</label>
                    <input
                        type="number"
                        name="avion_uso"
                        value={data.avion_uso}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block">Uso de residuos (kg)</label>
                    <input
                        type="number"
                        name="residuos_uso"
                        value={data.residuos_uso}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block">Uso de agua (m3 de agua)</label>
                    <input
                        type="number"
                        name="agua_uso"
                        value={data.agua_uso}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    {loading ? "Cargando..." : "Obtener Predicción"}
                </button>
            </form>

            {prediction && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Resultado:</h2>
                    <p>Emisiones Estimadas: {prediction.emisiones_estimadas.toFixed(2)} kg</p>
                    <p>Clasificación: {prediction.clasificacion}</p>
                    <p>Consejos: {prediction.consejos}</p>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
