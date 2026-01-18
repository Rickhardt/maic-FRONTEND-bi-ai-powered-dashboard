# Creador de Dashboards con IA - Frontend

Frontend de una aplicación web que permite a cualquier usuario convertirse en un analista de datos. Sube una hoja de cálculo (.xlsx o .csv) y la aplicación usará Inteligencia Artificial para analizar los datos, sugerir visualizaciones impactantes y ayudarte a construir un dashboard simple y elegante en segundos.

> **Nota**: Este es el proyecto del frontend. El backend debe ejecutarse en un proyecto separado.

## 🚀 Características

- **Carga de archivos**: Soporta archivos .xlsx, .xls y .csv con drag-and-drop
- **Análisis con IA**: La IA analiza automáticamente tus datos y sugiere visualizaciones relevantes
- **Visualizaciones interactivas**: Gráficos de barras, líneas, circulares y de dispersión
- **Dashboard flexible**: Agrega múltiples gráficos y organiza tu dashboard
- **Interfaz moderna**: Diseño limpio y responsivo con soporte para tema claro/oscuro

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

## 🚀 Ejecución

Desde la raíz del proyecto:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### ⚠️ Importante: Backend Requerido

Este frontend requiere que el backend esté ejecutándose. Por defecto, se conecta a `http://localhost:8000`. Asegúrate de que:

1. El backend esté ejecutándose en un proyecto separado
2. El backend tenga CORS configurado para permitir solicitudes desde `http://localhost:5173`
3. El backend implemente los siguientes endpoints:
   - `POST /api/upload` - Para subir y procesar archivos
   - `POST /api/chart-data` - Para obtener datos agregados de gráficos

## 📖 Uso

1. Asegúrate de que el backend esté ejecutándose
2. Abre la aplicación en tu navegador (`http://localhost:5173`)
3. Arrastra y suelta un archivo .xlsx o .csv, o haz clic para seleccionarlo
4. Espera mientras la IA analiza tus datos
5. Revisa las sugerencias de visualización generadas
6. Haz clic en "Agregar al Dashboard" en las sugerencias que te interesen
7. Visualiza tus gráficos en el dashboard
8. Elimina gráficos haciendo clic en el botón "×" en la esquina superior derecha

## 🏗️ Estructura del Proyecto

```
maic-bi-ai-powered-dashboard/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx      # Componente de carga de archivos
│   │   ├── LoadingState.tsx    # Estado de carga
│   │   ├── AnalysisCard.tsx    # Tarjeta de sugerencia
│   │   ├── Dashboard.tsx       # Dashboard principal
│   │   └── ChartRenderer.tsx   # Renderizado de gráficos
│   ├── services/
│   │   └── api.ts              # Cliente API
│   ├── types/
│   │   └── index.ts           # Tipos TypeScript
│   ├── App.tsx                # Componente principal
│   └── main.tsx               # Punto de entrada
├── package.json               # Dependencias Node.js
└── vite.config.ts            # Configuración de Vite
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (opcional):

```env
VITE_API_URL=http://localhost:8000
```

Si no se especifica, el frontend usará `http://localhost:8000` por defecto.

## 📚 Tecnologías Utilizadas

- **React**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **Recharts**: Librería de gráficos
- **Axios**: Cliente HTTP

## 🔌 API del Backend

El frontend espera que el backend implemente los siguientes endpoints:

### POST /api/upload

Sube y procesa un archivo .xlsx o .csv.

**Request:**
- Content-Type: `multipart/form-data`
- Body: archivo con nombre `file`

**Response:**
```typescript
{
  success: boolean;
  message: string;
  suggestions: ChartSuggestion[];
  file_info: {
    file_id: string;
    filename: string;
    rows: number;
    columns: number;
    column_names: string[];
  };
}
```

### POST /api/chart-data

Obtiene datos agregados para un gráfico específico.

**Request:**
```typescript
{
  file_id: string;
  chart_type: 'bar' | 'line' | 'pie' | 'scatter';
  parameters: {
    x_axis?: string;
    y_axis?: string;
    category?: string;
    value?: string;
    group_by?: string;
    aggregate?: string;
  };
}
```

**Response:**
```typescript
{
  success: boolean;
  chart_type: string;
  data: Array<{
    name?: string;
    value?: number;
    x?: number;
    y?: number;
    [key: string]: any;
  }>;
  labels?: string[];
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- Recharts por las visualizaciones hermosas
- React y Vite por la experiencia de desarrollo
