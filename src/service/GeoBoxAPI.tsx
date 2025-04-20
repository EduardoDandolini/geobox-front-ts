import axios from "axios";

import { DeliveryResponse } from '../Interfaces/DeliveryResponse';


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

export const getAllDeliveries = async (): Promise<DeliveryResponse[]> => {
  try {
    const response = await apiClient.get<DeliveryResponse[]>('api/v1/delivery');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    throw error;
  }
};
