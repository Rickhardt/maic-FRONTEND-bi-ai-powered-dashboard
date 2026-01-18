import { useState } from 'react';
import ChartRenderer from './ChartRenderer';
import type { DashboardChart } from '../types';
import './Dashboard.css';

interface DashboardProps {
  charts: DashboardChart[];
  onRemoveChart: (id: string) => void;
}

export default function Dashboard({ charts, onRemoveChart }: DashboardProps) {
  if (charts.length === 0) {
    return (
      <div className="dashboard-empty">
        <div className="empty-content">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="empty-icon"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
          <h3>Tu dashboard está vacío</h3>
          <p>Agrega gráficos desde las sugerencias de análisis para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-subtitle">{charts.length} gráfico{charts.length !== 1 ? 's' : ''} agregado{charts.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="dashboard-grid">
        {charts.map((chart) => (
          <div key={chart.id} className="dashboard-chart-wrapper">
            <button
              className="remove-chart-button"
              onClick={() => onRemoveChart(chart.id)}
              aria-label="Eliminar gráfico"
            >
              ×
            </button>
            <ChartRenderer
              chartType={chart.suggestion.chart_type}
              data={chart.data}
              title={chart.suggestion.title}
              labels={chart.labels}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
