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
    setState('uploading');
    setError(null);

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
        <h1 className="app-title">
          <span className="title-icon">🤖</span>
          Creador de Dashboards con IA
        </h1>
        <p className="app-subtitle">Análisis al Instante</p>
      </header>

      <main className="app-main">
        {state === 'idle' && (
          <section className="upload-section">
            <FileUpload onFileSelect={handleFileSelect} />
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
