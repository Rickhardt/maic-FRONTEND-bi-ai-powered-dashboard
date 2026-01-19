import axios from 'axios';
import type { UploadResponse, ChartDataResponse, ChartParameters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/api/upload', formData, {});

  return response.data;
};

export const getChartData = async (
  fileId: string,
  chartType: string,
  parameters: ChartParameters
): Promise<ChartDataResponse> => {
  const response = await api.post<ChartDataResponse>('/api/chart-data', {
    file_id: fileId,
    chart_type: chartType,
    parameters,
  });

  return response.data;
};

export default api;
