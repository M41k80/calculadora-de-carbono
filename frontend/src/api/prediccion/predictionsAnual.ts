import axios from "axios";

// TODO URL del backend
const API_URL = "https://calculadora-carbono-7ero.onrender.com";

// const API_URL = "http://localhost:8000";

// Interfaces para la respuesta de predicción anual
export interface PromediosMensuales {
    electricidad: number;
    auto: number;
    avion: number;
    residuos: number;
    agua: number;
}

export interface ResumenAnual {
    anio: string;
    emisiones_totales: number;
    promedios_mensuales: PromediosMensuales;
    consejos: string;
}

export interface DetalleMensual {
    mes: string;
    anio: string;
    electricidad_uso: number;
    auto_uso: number;
    avion_uso: number;
    residuos_uso: number;
    agua_uso: number;
    emisiones: number;
    clasificacion: string;
}

export interface PredictionAnualResponse {
    detalle_mensual: DetalleMensual[];
    resumen_anual: ResumenAnual[];
}


export const getAnnualPrediction = async (csvFile: FormData): Promise<PredictionAnualResponse> => {
    try {
        const response = await axios.post<PredictionAnualResponse>(
            `${API_URL}/predict/from-csv-mensual/`,
            csvFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al obtener la predicción anual:", error);
        throw error;
    }
};
