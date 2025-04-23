import axios from "axios"

const API_URL = "https://calculadora-de-carbono-1rzt.onrender.com/api/v1/auth"

export interface RegisterData {
    email: string
    password: string
    name: string
    companyname: string
}

export interface RegisterResponse {
    message: string
    user?: {
        id: string
        email: string
        name: string
        companyname: string

    }
}

export interface LoginData {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    message?: string
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_URL}/register`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.data
    } catch (error: unknown) {
        console.error("Error al registrar usuario:", error)
        if (error instanceof Error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw error.response.data;
            }
            throw { message: error.message };
        }
        throw { message: "Unknown error" };
    }
}




export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        // aquise guarda el token en localStorage
        const { token } = response.data
        localStorage.setItem("token", token)

        return response.data
    } catch (error: unknown) {
        console.error("Error al iniciar sesión:", error)
        if (error instanceof Error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw error.response.data
            }
            throw { message: error.message }
        }
        throw { message: "Unknown error" }
    }
}


