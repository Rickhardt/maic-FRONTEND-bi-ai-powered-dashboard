import './LoadingState.css';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'La IA está analizando tus datos...' }: LoadingStateProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
      <p className="loading-subtitle">Esto puede tomar unos segundos</p>
    </div>
  );
}
