import { useState } from 'react';
import FileUpload from './components/FileUpload';
import LoadingState from './components/LoadingState';
import AnalysisCard from './components/AnalysisCard';
import Dashboard from './components/Dashboard';
import ChartModal from './components/ChartModal';
import { uploadFile, getChartData } from './services/api';
import type { ChartSuggestion, DashboardChart, FileInfo } from './types';
import './App.css';

type AppState = 'idle' | 'uploading' | 'analyzing' | 'suggestions' | 'error';

function App() {
  const [state, setState] = useState<AppState>('idle');
  const [suggestions, setSuggestions] = useState<ChartSuggestion[]>([]);
  const [dashboardCharts, setDashboardCharts] = useState<DashboardChart[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedChart, setExpandedChart] = useState<DashboardChart | null>(null);

  const handleFileSelect = async (file: File) => {
    // Limpiar todos los datos del archivo anterior
    setSuggestions([]);
    setDashboardCharts([]);
    setFileInfo(null);
    setExpandedChart(null);
    setError(null);
    setState('uploading');

    try {
      const response = await uploadFile(file);
      setFileInfo(response.file_info);
      setSuggestions(response.suggestions);
      setState('suggestions');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Error al procesar el archivo');
      setState('error');
    }
  };

  const handleAddToDashboard = async (suggestion: ChartSuggestion) => {
    if (!fileInfo) return;

    try {
      setState('analyzing');
      
      const chartDataResponse = await getChartData(
        fileInfo.file_id,
        suggestion.chart_type,
        suggestion.parameters
      );

      const newChart: DashboardChart = {
        id: `${Date.now()}-${Math.random()}`,
        suggestion,
        data: chartDataResponse.data,
        labels: chartDataResponse.labels,
      };

      setDashboardCharts((prev) => [...prev, newChart]);
      setState('suggestions');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Error al obtener datos del gráfico');
      setState('error');
    }
  };

  const handleRemoveChart = (id: string) => {
    setDashboardCharts((prev) => prev.filter((chart) => chart.id !== id));
  };

  const handleExpandChart = (chart: DashboardChart) => {
    setExpandedChart(chart);
  };

  const handleCloseModal = () => {
    setExpandedChart(null);
  };

  const handleReset = () => {
    setState('idle');
    setSuggestions([]);
    setDashboardCharts([]);
    setFileInfo(null);
    setError(null);
    setExpandedChart(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand-header">
          <div className="brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#646cff"/>
              <path d="M16 8L18.5 13.5L24 16L18.5 18.5L16 24L13.5 18.5L8 16L13.5 13.5L16 8Z" fill="white"/>
            </svg>
          </div>
          <div className="brand-info">
            <h2 className="brand-name">DataLens AI</h2>
            <p className="brand-tagline">Transform data into insights</p>
          </div>
          {state === 'suggestions' && (
            <button 
              onClick={handleReset}
              className="new-file-button"
              aria-label="Subir nuevo archivo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Subir nuevo archivo
            </button>
          )}
        </div>
        <div className="header-separator"></div>
        <div className="hero-content">
          <h1 className="app-title">
            <span className="title-line">Conviértete en analista</span>
            <span className="title-line">de datos en segundos</span>
          </h1>
          <p className="app-subtitle">
            Sube tu hoja de cálculo y deja que la IA analice tus datos, sugiera visualizaciones
            impresionantes y construya un dashboard hermoso automáticamente
          </p>
        </div>
      </header>

      <main className="app-main">
        {state === 'idle' && (
          <section className="upload-section">
            <FileUpload key={fileInfo ? 'reset' : 'initial'} onFileSelect={handleFileSelect} />
          </section>
        )}

        {state === 'uploading' && (
          <section className="loading-section">
            <LoadingState message="Subiendo y procesando tu archivo..." />
          </section>
        )}

        {state === 'analyzing' && (
          <section className="loading-section">
            <LoadingState message="Obteniendo datos para el gráfico..." />
          </section>
        )}

        {state === 'error' && (
          <section className="error-section">
            <div className="error-card">
              <h2>❌ Error</h2>
              <p>{error}</p>
              <button onClick={handleReset} className="retry-button">
                Intentar de nuevo
              </button>
            </div>
          </section>
        )}

        {state === 'suggestions' && (
          <>
            <section className="suggestions-section">
              <div className="section-header">
                <h2>Sugerencias de Visualización</h2>
                <p className="section-subtitle">
                  La IA ha analizado tus datos y sugiere estas visualizaciones
                </p>
                {fileInfo && (
                  <div className="file-info-badge">
                    📄 {fileInfo.filename} ({fileInfo.rows} filas, {fileInfo.columns} columnas)
                  </div>
                )}
              </div>
              <div className="suggestions-grid">
                {suggestions.map((suggestion, index) => (
                  <AnalysisCard
                    key={index}
                    suggestion={suggestion}
                    onAddToDashboard={() => handleAddToDashboard(suggestion)}
                    disabled={false}
                  />
                ))}
              </div>
            </section>

            {dashboardCharts.length > 0 && (
              <section className="dashboard-section">
                <Dashboard 
                  charts={dashboardCharts} 
                  onRemoveChart={handleRemoveChart}
                  onExpandChart={handleExpandChart}
                />
              </section>
            )}
          </>
        )}
      </main>

      <ChartModal chart={expandedChart} onClose={handleCloseModal} />

      <footer className="app-footer">
        <p>
          Convierte tus datos en insights visuales en segundos
        </p>
      </footer>
    </div>
  );
}

export default App;
