import type { ChartSuggestion } from '../types';
import './AnalysisCard.css';

interface AnalysisCardProps {
  suggestion: ChartSuggestion;
  onAddToDashboard: () => void;
  disabled?: boolean;
}

export default function AnalysisCard({ suggestion, onAddToDashboard, disabled = false }: AnalysisCardProps) {
  const getChartTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      bar: 'Gráfico de Barras',
      line: 'Gráfico de Líneas',
      pie: 'Gráfico Circular',
      scatter: 'Gráfico de Dispersión',
    };
    return labels[type] || type;
  };

  const getChartIcon = (type: string): string => {
    const icons: Record<string, string> = {
      bar: '📊',
      line: '📈',
      pie: '🥧',
      scatter: '🔍',
    };
    return icons[type] || '📊';
  };

  return (
    <div className={`analysis-card ${disabled ? 'disabled' : ''}`}>
      <div className="card-header">
        <span className="chart-icon">{getChartIcon(suggestion.chart_type)}</span>
        <div className="card-title-section">
          <h3 className="card-title">{suggestion.title}</h3>
          <span className="chart-type-badge">{getChartTypeLabel(suggestion.chart_type)}</span>
        </div>
      </div>
      
      <div className="card-body">
        <p className="card-insight">{suggestion.insight}</p>
      </div>
      
      <div className="card-footer">
        <button
          className="add-button"
          onClick={onAddToDashboard}
          disabled={disabled}
        >
          Agregar al Dashboard
        </button>
      </div>
    </div>
  );
}
