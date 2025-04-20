import axios from "axios"

// TODO URL del backend
const API_URL = "https://calculadora-carbono-7ero.onrender.com"

export interface EmissionsPrediction {
    emisiones_estimadas: number
    clasificacion: string
    consejos: string
}

export const getEmissionsPrediction = async (data: {
    electricidad_uso: number
    auto_uso: number
    avion_uso: number
    residuos_uso: number
    agua_uso: number
}): Promise<EmissionsPrediction> => {
    try {

        const response = await axios.post<EmissionsPrediction>(
            `${API_URL}/predict/emisiones`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )


        return response.data
    } catch (error) {
        console.error("Error al obtener la predicción de emisiones:", error)
        throw error
    }
}