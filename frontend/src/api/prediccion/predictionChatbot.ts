import axios from "axios";

const API_URL = "https://calculadora-carbono-7ero.onrender.com";

export interface ChatRequest {
    question: string;
}

export interface ChatResponse {
    respuesta: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await axios.post<ChatResponse>(
            `${API_URL}/chat-carbono`,
            {
                question: message,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al enviar el mensaje al chatbot:", error);
        throw error;
    }
};
