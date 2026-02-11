# Datos del Menú Escolar

Esta carpeta contiene los datos extraídos del menú del comedor escolar Educare para el curso 2025-2026.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `Alergias Menú Educare 2025-2026.xlsx` | Fichero Excel original con el menú completo del comedor |
| `menu_frutos_secos.json` | Menú extraído para alergia a frutos de cáscara (frutos secos). La webapp usa una copia en `webapp/data/menu_frutos_secos.json` para cargar el perfil Bechita. |

## Estructura del menú

El menú escolar tiene las siguientes características:

- **Dieta rotativa de 7 semanas**: Una vez termina la semana 7, se vuelve a empezar por la semana 1
- **Días lectivos**: Lunes a Viernes (sin fines de semana)
- **9 variaciones por día**: Cada día tiene menús adaptados a diferentes alergias/dietas:
  - Basal (menú estándar)
  - Gluten
  - Lact/Lech (Lactosa/Leche)
  - Legumbre (incluido soja)
  - Pescado
  - Huevo
  - **F. de cáscara / F. Secos** (Frutos secos) ← Este es el que nos interesa
  - Colesterol
  - Vegetariana

## Proceso de extracción del JSON

El fichero `menu_frutos_secos.json` se generó mediante un script de Python que:

### 1. Lectura del Excel

```python
import pandas as pd
from openpyxl import load_workbook

file_path = r"data\Alergias Menú Educare 2025-2026.xlsx"
wb = load_workbook(file_path)
```

El Excel contiene las siguientes hojas:
- `Semana 1` a `Semana 7`: Menús semanales con todas las variaciones
- `Desayunos y meriendas`: Menús de desayuno y merienda (ignorados)
- `Primero`, `Segundo`, `Guarnición`, `Postre`: Catálogo de platos con información nutricional

### 2. Extracción de la dieta "F. de cáscara"

Para cada hoja de semana (Semana 1-7), se extraen las filas donde la columna "Dieta" contiene "cáscara" o "F.de cáscara":

```python
def extract_nut_allergy_menu(file_path, week_num):
    sheet_name = f"Semana {week_num}"
    df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
    
    for idx, row in df.iterrows():
        diet = row[2]  # Columna de dieta
        if "cáscara" in str(diet).lower():
            # Extraer: primer_plato, segundo_plato, guarnicion, postre
            ...
```

### 3. Mapeo con fechas reales

Dado que:
- Hoy (11 de febrero de 2026) corresponde a la **Semana 4** del menú
- La semana 4 empezó el lunes 9 de febrero de 2026
- Por tanto, la semana 1 empezó el lunes 19 de enero de 2026

Se calculan las fechas para cada día del menú:

```python
from datetime import datetime, timedelta

today = datetime(2026, 2, 11)
current_menu_week = 4

# Calcular el lunes de la semana 4
days_since_monday = today.weekday()  # Miércoles = 2
week_4_monday = today - timedelta(days=days_since_monday)  # 9 Feb 2026

# Calcular el inicio del ciclo (semana 1)
week_1_monday = week_4_monday - timedelta(weeks=3)  # 19 Ene 2026
```

### 4. Generación del JSON

El JSON resultante tiene tres secciones:

```json
{
  "metadata": {
    "descripcion": "Menú escolar para alergia a frutos de cáscara",
    "fecha_generacion": "2026-02-11",
    "semana_actual": 4,
    "fecha_inicio_ciclo": "2026-01-19",
    "total_semanas_ciclo": 7
  },
  "menu_semanal": {
    "semana_1": { "Lunes": {...}, "Martes": {...}, ... },
    "semana_2": { ... },
    ...
  },
  "calendario": [
    { "fecha": "2026-01-19", "dia_semana": "Lunes", "semana_menu": 1, ... },
    { "fecha": "2026-01-20", "dia_semana": "Martes", "semana_menu": 1, ... },
    ...
  ]
}
```

## Estructura del JSON

### `metadata`
Información general sobre el menú y cuándo se generó.

### `menu_semanal`
El menú de las 7 semanas organizado jerárquicamente:
- Por semana (`semana_1`, `semana_2`, ...)
- Por día (`Lunes`, `Martes`, ...)
- Con los platos: `primer_plato`, `segundo_plato`, `guarnicion`, `postre`

### `calendario`
Array de objetos con el menú mapeado a fechas concretas. Incluye 3 ciclos completos (21 semanas) para facilitar la consulta por fecha. Cada entrada contiene:
- `fecha`: Fecha en formato YYYY-MM-DD
- `dia_semana`: Nombre del día en español
- `semana_menu`: Número de semana del ciclo (1-7)
- `ciclo`: Número de ciclo
- `primer_plato`, `segundo_plato`, `guarnicion`, `postre`: Los platos del día

## Dependencias

Para ejecutar el script de extracción se necesita:

```bash
pip install pandas openpyxl
```

## Notas

- Los menús de **desayuno y merienda** no se han incluido en la extracción
- El JSON incluye **3 ciclos completos** (desde enero a junio 2026)
- Para fechas más allá del ciclo 3, el menú vuelve a repetirse desde la semana 1
