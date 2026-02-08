# DietLoop - Aplicación de Seguimiento de Peso

Aplicación web responsive para el seguimiento de tu plan de pérdida de peso. Funciona en PC, tablet y smartphone.

## 🌐 Acceso Online

**URL:** https://serocasoftware.github.io/dietloop/webapp/

## 📱 Diseño Responsive

La aplicación se adapta automáticamente al dispositivo:

| Dispositivo | Características |
|-------------|-----------------|
| **Desktop** (> 992px) | Sidebar fijo, layout completo |
| **Tablet** (768px - 992px) | Sidebar más compacto |
| **Móvil** (< 768px) | Menú hamburguesa, layout vertical |

## Cómo usar

### Opción 1: Versión Online (Recomendada)

Accede directamente desde cualquier dispositivo:
https://serocasoftware.github.io/dietloop/webapp/

### Opción 2: Abrir localmente

1. Navega a la carpeta `webapp`
2. Haz doble clic en `index.html`
3. Se abrirá en tu navegador predeterminado

### Opción 3: Servidor local

```bash
cd webapp
python -m http.server 8080
```

Luego abre: `http://localhost:8080`

## Funcionalidades

### 📊 Dashboard
- Vista general del progreso del mes actual
- Gráfica de evolución semanal
- Plan de comidas y ejercicio del día
- Estadísticas rápidas

### 📅 Calendario
- Vista mensual con indicadores de comida y ejercicio
- Click/tap en un día para ver el detalle completo
- Navegación entre meses

### 🥗 Plan de Dieta
- Menú completo semana por semana
- Desayuno, almuerzo, comida, merienda y cena
- Cantidades recomendadas

### 💪 Plan de Deporte
- Ejercicios detallados para cada día de entrenamiento
- Progresión semanal
- Días de descanso incluidos

### 📈 Progreso
- Gráfica global: Objetivo vs Real
- Resumen mensual en barras
- Cumplimiento de objetivos
- Tabla de registro de pesos
- Formulario para registrar nuevos pesos

### 📚 Histórico
- Timeline de todos los meses
- Detalle de cada mes pasado
- Comparativa de resultados

### 🛒 Próxima Compra
- Lista de la compra semanal
- Organizada por secciones del supermercado
- Alimentos prohibidos destacados
- Consejos de compra
- Precio estimado

## 🚫 Alimentos Prohibidos

La dieta excluye los siguientes alimentos:
- Brócoli, Coliflor, Repollo
- Garbanzos, Alcachofa, Lombarda
- Chocolate
- Pescadilla, Quinoa
- Pepino, Pepinillo, Aceitunas
- Kiwi, Membrillo

## 💾 Datos

Los pesos que registres se guardan en el `localStorage` del navegador, por lo que persisten entre sesiones.

## 📁 Estructura de archivos

```
webapp/
├── index.html    # Estructura HTML + componentes móviles
├── styles.css    # Estilos + media queries responsive
├── app.js        # Lógica + menú móvil
├── data.js       # Datos del plan + listas de compra
└── README.md     # Este archivo
```

## 🔧 Personalización

Para añadir datos de nuevos meses, edita `data.js`:
- `monthData` - Planes de dieta y ejercicio
- `shoppingLists` - Listas de la compra
- `monthlyGoals` - Objetivos de peso

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para Chart.js y fuentes)

## Tecnologías

- HTML5, CSS3, JavaScript (ES6+)
- Chart.js para gráficas
- CSS Grid y Flexbox para layout
- Media Queries para responsive
- LocalStorage para persistencia
