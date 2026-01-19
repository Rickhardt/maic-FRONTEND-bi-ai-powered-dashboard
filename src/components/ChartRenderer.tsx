import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ChartType, ChartDataPoint, ChartParameters } from '../types';
import './ChartRenderer.css';

interface ChartRendererProps {
  chartType: ChartType;
  data: ChartDataPoint[];
  title: string;
  labels?: string[];
  isExpanded?: boolean;
  parameters?: ChartParameters;
}

const COLORS = ['#646cff', '#535bf2', '#747bff', '#8b92ff', '#a2a7ff'];

// Helper function to format axis labels
const formatAxisLabel = (label: string | null | undefined): string => {
  if (!label) return '';
  // Convert snake_case or UPPERCASE to Title Case
  return label
    .split(/[_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function ChartRenderer({ chartType, data, title, isExpanded = false, parameters }: ChartRendererProps) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No hay datos disponibles para este gráfico</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              style={{ fontSize: '0.875rem' }}
              label={parameters?.x_axis ? { value: formatAxisLabel(parameters.x_axis), position: 'insideBottom', offset: -5, style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' } } : undefined}
            />
            <YAxis 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} 
              style={{ fontSize: '0.875rem' }}
              label={parameters?.y_axis ? { value: formatAxisLabel(parameters.y_axis), angle: -90, position: 'insideLeft', style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', textAnchor: 'middle' } } : undefined}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(100, 108, 255, 0.3)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.87)',
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="#646cff" radius={[8, 8, 0, 0]} />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              style={{ fontSize: '0.875rem' }}
              label={parameters?.x_axis ? { value: formatAxisLabel(parameters.x_axis), position: 'insideBottom', offset: -5, style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' } } : undefined}
            />
            <YAxis 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} 
              style={{ fontSize: '0.875rem' }}
              label={parameters?.y_axis ? { value: formatAxisLabel(parameters.y_axis), angle: -90, position: 'insideLeft', style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', textAnchor: 'middle' } } : undefined}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(100, 108, 255, 0.3)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.87)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#646cff"
              strokeWidth={2}
              dot={{ fill: '#646cff', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={isExpanded ? 150 : 80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(100, 108, 255, 0.3)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.87)',
              }}
            />
            <Legend />
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              type="number"
              dataKey="x"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              style={{ fontSize: '0.875rem' }}
              label={parameters?.x_axis ? { value: formatAxisLabel(parameters.x_axis), position: 'insideBottom', offset: -5, style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' } } : undefined}
            />
            <YAxis
              type="number"
              dataKey="y"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              style={{ fontSize: '0.875rem' }}
              label={parameters?.y_axis ? { value: formatAxisLabel(parameters.y_axis), angle: -90, position: 'insideLeft', style: { fill: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', textAnchor: 'middle' } } : undefined}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(100, 108, 255, 0.3)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.87)',
              }}
            />
            <Scatter dataKey="y" fill="#646cff" />
          </ScatterChart>
        );

      default:
        return <div>Tipo de gráfico no soportado</div>;
    }
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={isExpanded ? 600 : 300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
