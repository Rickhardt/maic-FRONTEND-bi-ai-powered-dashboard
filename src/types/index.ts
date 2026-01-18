export type ChartType = 'bar' | 'line' | 'pie' | 'scatter';

export interface ChartParameters {
  x_axis?: string;
  y_axis?: string;
  category?: string;
  value?: string;
  group_by?: string;
  aggregate?: string;
}

export interface ChartSuggestion {
  title: string;
  chart_type: ChartType;
  parameters: ChartParameters;
  insight: string;
}

export interface FileInfo {
  file_id: string;
  filename: string;
  rows: number;
  columns: number;
  column_names: string[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  suggestions: ChartSuggestion[];
  file_info: FileInfo;
}

export interface ChartDataPoint {
  name?: string;
  value?: number;
  x?: number;
  y?: number;
  category?: string;
  [key: string]: any;
}

export interface ChartDataResponse {
  success: boolean;
  chart_type: ChartType;
  data: ChartDataPoint[];
  labels?: string[];
}

export interface DashboardChart {
  id: string;
  suggestion: ChartSuggestion;
  data: ChartDataPoint[];
  labels?: string[];
}
