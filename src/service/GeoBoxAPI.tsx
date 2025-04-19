import axios from "axios";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (loginDTO: LoginDTO): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('api/v1/login', loginDTO);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};
