import axios from "axios";

import { DeliveryResponse } from '../Interfaces/DeliveryResponse';
import { TruckResponse } from '../Interfaces/TruckResponse';
import { DeliveryRequest } from '../Interfaces/DeliveryRequest';
import { BoxResponse } from '../Interfaces/BoxResponse';
import { LoginResponse } from "../Interfaces/LoginResponse";
import { GamificationResponse } from "../Interfaces/GamificationResponse";
import { WithdrawalRequest } from "../Interfaces/WithdrawalRequest";

export interface LoginDTO {
  email: string;
  password: string;
}

const apiClient = axios.create({
  baseURL: 'http://172.16.220.214:8080/',
  // baseURL: 'http://localhost:8080/',
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
    const response = await apiClient.get<DeliveryResponse[]>('api/v1/delivery/locations');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    throw error;
  }
};

export const getTrucks = async (): Promise<TruckResponse[]> => {
  try {
      const response = await apiClient.get('api/v1/truck');
      return response.data;
  } catch (error) {
      console.error('Erro ao buscar caminhões:', error);
      return []; 
  }
};

export const saveDelivery = async (deliveryRequest: DeliveryRequest): Promise<void> => {
  try {
    await apiClient.post<void>('api/v1/delivery/save', deliveryRequest);
    console.log('Entrega salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar entrega:', error);
  }
};

export const withdrawal = async (withdrawalRequest: WithdrawalRequest): Promise<void> => {
  try {
    await apiClient.post<void>('api/v1/delivery/withdrawal', withdrawalRequest);
    console.log('Entrega retirada com sucesso!');
  } catch (error) {
    console.error('Erro ao retirar entrega:', error);
  }
};


export const getBoxes = async (): Promise<BoxResponse[]> => {
  try {
    const response = await apiClient.get<BoxResponse[]>('api/v1/box');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar caixas:', error);
    return [];
  }
};

export const getPoints = async (): Promise<GamificationResponse[]> => {
  try {
    const response = await apiClient.get<GamificationResponse[]>('api/v1/gamification/points');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    return [];
  }
};

export const generateSheetDelivery = async () => {
  try {
    const response = await apiClient.get('api/v1/delivery/generate-sheet', {
      responseType: 'blob',
    });
    return response.data; // isso será um Blob agora
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    throw error;
  }
};
