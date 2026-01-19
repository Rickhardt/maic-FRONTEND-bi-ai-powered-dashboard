# DataLens AI - Creador de Dashboards con IA

Frontend de una aplicación web que permite a cualquier usuario convertirse en un analista de datos. Sube una hoja de cálculo (.xlsx o .csv) y la aplicación usará Inteligencia Artificial para analizar los datos, sugerir visualizaciones impactantes y ayudarte a construir un dashboard simple y elegante en segundos.

> **Nota**: Este es el proyecto del frontend. El backend debe ejecutarse en un proyecto separado.

## 🚀 Características

- **Carga de archivos**: Soporta archivos .xlsx, .xls y .csv con drag-and-drop
- **Análisis con IA**: La IA analiza automáticamente tus datos y sugiere visualizaciones relevantes
- **Visualizaciones interactivas**: Gráficos de barras, líneas, circulares y de dispersión
- **Dashboard flexible**: Agrega múltiples gráficos y organiza tu dashboard
- **Interfaz moderna**: Diseño limpio y responsivo con soporte para tema claro/oscuro usando Tailwind CSS
- **Componentes UI**: Sistema de componentes basado en shadcn/ui y Radix UI

## 📋 Requisitos

- Node.js 18+ (recomendado Node.js 20+)
- npm o yarn
- Backend ejecutándose (ver sección de configuración)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd maic-FRONTEND-bi-ai-powered-dashboard
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo:
- React y React DOM
- TypeScript
- Vite
- Tailwind CSS v4
- Recharts (para gráficos)
- Axios (cliente HTTP)
- Componentes UI (Radix UI, shadcn/ui)
- Y otras dependencias de desarrollo

### 3. Configurar variables de entorno (Opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000
```

Si no se especifica, el frontend usará `http://localhost:8000` por defecto.

Para diferentes entornos, puedes crear:
- `.env.development` - Para desarrollo local
- `.env.production` - Para producción

### 4. Verificar configuración

El proyecto ya viene configurado con:
- ✅ Tailwind CSS v4 con PostCSS
- ✅ Path aliases (`@/*` → `src/*`)
- ✅ TypeScript configurado
- ✅ Componentes UI base (Card, Button)

## 🚀 Ejecución

### Modo Desarrollo

Desde la raíz del proyecto:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`.

### Preview del Build

Para previsualizar el build de producción:

```bash
npm run preview
```

### ⚠️ Importante: Backend Requerido

Este frontend requiere que el backend esté ejecutándose. Por defecto, se conecta a `http://localhost:8000`. Asegúrate de que:

1. El backend esté ejecutándose en un proyecto separado
2. El backend tenga CORS configurado para permitir solicitudes desde `http://localhost:5173`
3. El backend implemente los siguientes endpoints:
   - `POST /api/upload` - Para subir y procesar archivos
   - `POST /api/chart-data` - Para obtener datos agregados de gráficos

## 📖 Uso

1. **Asegúrate de que el backend esté ejecutándose**
2. **Inicia el frontend**: Ejecuta `npm run dev`
3. **Abre la aplicación** en tu navegador (`http://localhost:5173`)
4. **Sube un archivo**: Arrastra y suelta un archivo .xlsx o .csv, o haz clic para seleccionarlo
5. **Espera el análisis**: La IA analizará tus datos automáticamente
6. **Revisa las sugerencias**: Explora las visualizaciones sugeridas por la IA
7. **Agrega al dashboard**: Haz clic en "Agregar al Dashboard" en las sugerencias que te interesen
8. **Visualiza tus gráficos**: Los gráficos aparecerán en el dashboard
9. **Interactúa con los gráficos**:
   - Elimina gráficos haciendo clic en el botón "×" en la esquina superior derecha
   - Expande gráficos haciendo clic en el botón "Expandir" para verlos en pantalla completa

## 🏗️ Estructura del Proyecto

```
maic-FRONTEND-bi-ai-powered-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes UI reutilizables (shadcn/ui)
│   │   │   ├── card.tsx           # Componente Card
│   │   │   ├── button.tsx         # Componente Button
│   │   │   └── ...                # Otros componentes UI
│   │   ├── FileUpload.tsx         # Componente de carga de archivos
│   │   ├── FileUpload.css        # Estilos del componente FileUpload
│   │   ├── LoadingState.tsx      # Estado de carga
│   │   ├── LoadingState.css      # Estilos del componente LoadingState
│   │   ├── AnalysisCard.tsx       # Tarjeta de sugerencia
│   │   ├── AnalysisCard.css      # Estilos del componente AnalysisCard
│   │   ├── Dashboard.tsx         # Dashboard principal
│   │   ├── Dashboard.css         # Estilos del componente Dashboard
│   │   ├── ChartRenderer.tsx     # Renderizado de gráficos
│   │   ├── ChartRenderer.css     # Estilos del componente ChartRenderer
│   │   ├── ChartModal.tsx        # Modal para gráficos expandidos
│   │   └── ChartModal.css        # Estilos del componente ChartModal
│   ├── lib/
│   │   └── utils.ts              # Utilidades (función cn para Tailwind)
│   ├── services/
│   │   └── api.ts                # Cliente API (Axios)
│   ├── types/
│   │   └── index.ts              # Tipos TypeScript
│   ├── App.tsx                   # Componente principal
│   ├── App.css                   # Estilos globales de la aplicación
│   ├── index.css                 # Estilos base y variables CSS
│   └── main.tsx                  # Punto de entrada
├── public/                        # Archivos estáticos
├── .env                           # Variables de entorno (crear manualmente)
├── .env.development               # Variables de entorno para desarrollo
├── .env.production                # Variables de entorno para producción
├── tailwind.config.js             # Configuración de Tailwind CSS
├── postcss.config.js              # Configuración de PostCSS
├── vite.config.ts                 # Configuración de Vite
├── tsconfig.json                  # Configuración de TypeScript
├── tsconfig.app.json              # Configuración de TypeScript para la app
├── package.json                   # Dependencias Node.js
└── README.md                      # Este archivo
```

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Desarrollo Local

Crea un archivo `.env.development`:

```env
VITE_API_URL=http://localhost:8000
```

#### Producción

Crea un archivo `.env.production`:

```env
VITE_API_URL=https://tu-backend-api.com
```

O configura la variable en tu plataforma de hosting (Vercel, Netlify, etc.)

### Tailwind CSS

El proyecto usa Tailwind CSS v4 con configuración personalizada. Las variables CSS están definidas en `src/index.css` y se pueden personalizar según tus necesidades.

### Path Aliases

El proyecto está configurado con path aliases para facilitar las importaciones:

```typescript
// En lugar de:
import { cn } from '../../lib/utils'

// Puedes usar:
import { cn } from '@/lib/utils'
```

### Agregar Componentes UI Adicionales

Si necesitas agregar más componentes de shadcn/ui:

1. Copia el archivo del componente a `src/components/ui/`
2. Instala las dependencias de Radix UI necesarias:
   ```bash
   npm install @radix-ui/react-[componente]
   ```
3. Asegúrate de que el componente importe correctamente desde `@/lib/utils`

## 📚 Tecnologías Utilizadas

### Core
- **React 19**: Biblioteca de UI moderna
- **TypeScript**: Tipado estático para mayor seguridad
- **Vite 7**: Build tool y dev server ultra rápido

### Estilos
- **Tailwind CSS v4**: Framework CSS utility-first
- **PostCSS**: Procesador CSS
- **CSS Variables**: Sistema de temas con variables CSS

### UI Components
- **shadcn/ui**: Sistema de componentes basado en Radix UI
- **Radix UI**: Componentes primitivos accesibles
- **Lucide React**: Iconos modernos

### Gráficos y Visualización
- **Recharts**: Librería de gráficos para React

### HTTP y Utilidades
- **Axios**: Cliente HTTP
- **class-variance-authority**: Utilidad para variantes de componentes
- **clsx**: Utilidad para combinar clases CSS
- **tailwind-merge**: Merge de clases Tailwind

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

## 🐛 Solución de Problemas

### Error de CORS

Si encuentras errores de CORS, asegúrate de que:
1. El backend tenga CORS configurado correctamente
2. La URL del backend en `.env` sea correcta
3. El backend permita solicitudes desde `http://localhost:5173`

### Error de Tailwind CSS

Si Tailwind no funciona correctamente:
1. Verifica que `@tailwindcss/postcss` esté instalado
2. Revisa que `postcss.config.js` use `'@tailwindcss/postcss'`
3. Asegúrate de que `src/index.css` tenga las directivas `@tailwind`

### Error de Path Aliases

Si las importaciones con `@/` no funcionan:
1. Verifica `tsconfig.app.json` tiene la configuración de paths
2. Verifica `vite.config.ts` tiene el alias configurado
3. Reinicia el servidor de desarrollo

## 🚀 Despliegue

### Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Vercel detectará automáticamente Vite y configurará el build

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`
4. Agrega las variables de entorno en la configuración del sitio

### Otras Plataformas

Cualquier plataforma que soporte Node.js y pueda ejecutar `npm run build` funcionará. Asegúrate de configurar la variable de entorno `VITE_API_URL` con la URL de tu backend en producción.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- Usa TypeScript para todo el código
- Sigue las convenciones de React (componentes funcionales, hooks)
- Usa Tailwind CSS para estilos (evita CSS inline cuando sea posible)
- Mantén los componentes pequeños y reutilizables
- Documenta componentes complejos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- **Recharts** por las visualizaciones hermosas
- **React y Vite** por la experiencia de desarrollo
- **shadcn/ui** por el sistema de componentes
- **Radix UI** por los componentes primitivos accesibles
- **Tailwind CSS** por el framework de estilos

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Abre un issue en el repositorio
3. Consulta la documentación de las tecnologías utilizadas

---

**Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS**
