# Creador de Dashboards con IA

Frontend de una aplicación web que permite a cualquier usuario convertirse en un analista de datos. Sube una hoja de cálculo (.xlsx o .csv) y la aplicación usará Inteligencia Artificial para analizar los datos, sugerir visualizaciones impactantes y ayudarte a construir un dashboard simple y elegante en segundos.

> **Nota**: Este es solo el proyecto del frontend. El backend debe ejecutarse en un proyecto separado.

## Características

- **Carga de archivos**: Soporta archivos .xlsx, .xls y .csv con drag-and-drop
- **Análisis con IA**: La IA analiza automáticamente tus datos y sugiere visualizaciones relevantes
- **Visualizaciones interactivas**: Gráficos de barras, líneas, circulares y de dispersión
- **Dashboard flexible**: Agrega múltiples gráficos y organiza tu dashboard
- **Interfaz moderna**: Diseño limpio y responsivo con soporte para tema claro/oscuro usando Tailwind CSS
- **Componentes UI**: Sistema de componentes basado en shadcn/ui y Radix UI

## 📋 Requisitos

- Node.js 18+
- Todas las librerías necesarias ya están consideradas en el archivo package.json

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Rickhardt/maic-FRONTEND-bi-ai-powered-dashboard.git
cd maic-FRONTEND-bi-ai-powered-dashboard
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno (Esto es opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000
```

Si no se especifica, el frontend usará `http://localhost:8000` por defecto (Esto solo si el proyecto se corre en un servidor propio).

Para diferentes entornos, se puede crear:
- `.env.development` - Para desarrollo local
- `.env.production` - Para producción

## ¿Cómo ejecutar?

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


## ¿Cómo usar la aplicación?

1. **Asegurarse de que el backend esté ejecutándose**
2. **Inicia el frontend**: ejecutando `npm run dev`
3. **Abrir la aplicación** navegando hasta `http://localhost:5173`
4. **Subir un archivo**: Arrastra y suelta un archivo .xlsx, .xls o .csv, o haz clic en el campo para buscarlo desde el explorador de archivos
5. **Revisar las sugerencias**: Explorar las visualizaciones sugeridas por la IA
6. **Agregar al dashboard**: Haga clic en "Agregar al Dashboard" en las sugerencias que le interesen
8. **Visualizar los gráficos**: Los gráficos aparecerán en el dashboard
9. **Interacción con los gráficos**:
   - Eliminar gráficos haciendo clic en el botón "×" en la esquina superior derecha
   - Expandir gráficos haciendo clic en el botón "Expandir" para verlos en pantalla completa


## Frameworks o herramientas Utilizadas

### Core
- **React 19**: Porque es la versión actual estable de React aunque bien podría utilizarse la versión 18. Pudo haber sido Angular también, tengo experiencia en ambas pero usualmente prefiero usar React.
- **TypeScript**: Por el tipado que agrega a Javascript que permite verificar problemas antes de correr la aplicación en el navegador.

### Estilos
- **Tailwind CSS v4**: Mi experiencia previa me ha demostrado que es muy útil para crear prototipos de forma rápida para evitar escribir mucho CSS. Mi lógica fue, estilizar lo menos posible ahora, lograr el funcionamiento mínimo esperado y estilizar al obtener la aprobación del usuario. Es decir, crear un MVP

### Componentes de UI
- **shadcn/ui**: Fueron elementos generados por v0 de Vercel
- **Radix UI**: Es la misma razón de usar Tailwind, aunque podría haberse usado bootstrap, siento que se ve más moderno estos elementos.
- **Lucide React**: Iconos modernos, también recomendados por v0.

### Gráficos y Visualización
- **Recharts**: Yo pretendía usar ChartJS (Con la que ya tengo experiencia) pero vi que era un poco más difícil de utilizar en React (Incluso en Angular) así que en Cursor pregunté por una librería que tuviera soporte lo más parecido a nativo en React y me sugirió esta. Investigando veo que es fácil de implementar (Y rápida para este prototipo)

### HTTP y Utilidades
- **Axios**: ya tengo experiencia con esta librería así que la utilicé por que puedo utilizarla de forma rápida. Además, la siento más cómoda de utilizar.



### Notas importantes

## Acerca del backend

Como ya se mencionó antes, este proyecto es solo el frontend, requiere que el backend esté ejecutándose. Por defecto, se conecta a `http://localhost:8000`. Hay que asegurarse de que:

1. El backend esté ejecutándose en un proyecto separado
2. El backend tenga CORS configurado para permitir solicitudes desde la URL desde donde se ejecuta este proyecto (Por defecto utiliza esta `http://localhost:5173`)


## La aplicación se puede acceder desde internet

Esta aplicación está desplegada en https://bi-dashboard-vert.vercel.app/ (Este sería la página web), ya tiene todo configurado para poder utilizarse. Se está usando Vercel para el hosting del frontend y Render para el backend. Ya que se está usando los planes gratuitos, la API se pone en hibernación luego de cierto tiempo sin actividd y puede tardarse hasta 50 segundos en reactivarse y esto podría afectar la primera petición que se haga, así que espero que tomen en cuenta esto al momento de evaluar la velocidad con la que retorna la información de las sugerencias de gráficos.
