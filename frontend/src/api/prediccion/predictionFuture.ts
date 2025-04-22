import axios from "axios";


export interface ConsumoMensual {
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




export const obtenerPrediccionFutura = async (
    meses: number,
    historial: ConsumoMensual[]
) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/predict/future/`,
            historial,
            {
                params: { meses },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error en la predicción:", error);
        throw error;
    }
};
