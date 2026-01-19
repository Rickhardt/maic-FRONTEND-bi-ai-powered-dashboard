import { useEffect } from 'react';
import ChartRenderer from './ChartRenderer';
import type { DashboardChart } from '../types';
import './ChartModal.css';

interface ChartModalProps {
  chart: DashboardChart | null;
  onClose: () => void;
}

export default function ChartModal({ chart, onClose }: ChartModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (chart) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [chart, onClose]);

  if (!chart) return null;

  return (
    <div className="chart-modal-overlay" onClick={onClose}>
      <div className="chart-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="chart-modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="chart-modal-header">
          <h2 className="chart-modal-title">{chart.suggestion.title}</h2>
          <p className="chart-modal-insight">{chart.suggestion.insight}</p>
        </div>
        <div className="chart-modal-chart">
          <ChartRenderer
            chartType={chart.suggestion.chart_type}
            data={chart.data}
            title={chart.suggestion.title}
            labels={chart.labels}
            isExpanded={true}
            parameters={chart.suggestion.parameters}
          />
        </div>
      </div>
    </div>
  );
}
