# DietLoop - Aplicación de Seguimiento de Peso

Aplicación web local para el seguimiento de tu plan de pérdida de peso.

## Cómo usar

### Opción 1: Abrir directamente en el navegador

1. Navega a la carpeta `webapp`
2. Haz doble clic en `index.html`
3. Se abrirá en tu navegador predeterminado

> **Nota:** Algunos navegadores pueden bloquear ciertas funcionalidades al abrir archivos locales. Si esto ocurre, usa la Opción 2.

### Opción 2: Usar un servidor local (recomendado)

#### Con Python (si lo tienes instalado):

```bash
cd webapp
python -m http.server 8080
```

Luego abre en tu navegador: `http://localhost:8080`

#### Con Node.js (si lo tienes instalado):

```bash
npx serve webapp
```

#### Con la extensión Live Server de VS Code:

1. Instala la extensión "Live Server" en VS Code/Cursor
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## Funcionalidades

### Dashboard
- Vista general del progreso del mes actual
- Gráfica de evolución semanal
- Plan de comidas y ejercicio del día
- Estadísticas rápidas

### Calendario
- Vista mensual con indicadores de comida y ejercicio
- Click en un día para ver el detalle completo
- Navegación entre meses

### Plan de Dieta
- Menú completo semana por semana
- Desayuno, almuerzo, comida, merienda y cena
- Cantidades recomendadas

### Plan de Deporte
- Ejercicios detallados para cada día de entrenamiento
- Progresión semanal
- Días de descanso incluidos

### Progreso
- Gráfica global: Objetivo vs Real
- Resumen mensual en barras
- Cumplimiento de objetivos
- Tabla de registro de pesos
- Formulario para registrar nuevos pesos

### Histórico
- Timeline de todos los meses
- Detalle de cada mes pasado
- Comparativa de resultados

## Datos

Los pesos que registres se guardan en el `localStorage` del navegador, por lo que persisten entre sesiones. Los datos del plan (dieta y ejercicio) están en `data.js`.

## Estructura de archivos

```
webapp/
├── index.html    # Estructura HTML
├── styles.css    # Estilos visuales
├── app.js        # Lógica de la aplicación
├── data.js       # Datos del plan (dieta y ejercicio)
└── README.md     # Este archivo
```

## Personalización

Para añadir datos de nuevos meses, edita el archivo `data.js` y añade la información en el objeto `monthData` siguiendo la misma estructura del Mes 1.

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (solo para cargar Chart.js y la fuente)
