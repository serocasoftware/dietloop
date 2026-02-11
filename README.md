# DietLoop

Aplicación web para seguimiento de dieta, ejercicio y menú escolar. Incluye varios perfiles de usuario (dieta/ejercicio para adultos y menú infantil de comedor).

## Contenido del repositorio

| Carpeta / archivos | Descripción |
|--------------------|-------------|
| **webapp/** | Aplicación web (HTML, CSS, JS). Ver [webapp/README.md](webapp/README.md) para uso y despliegue. |
| **data/** | Datos del menú escolar (Excel y JSON). Ver [data/README.md](data/README.md) para estructura y generación del JSON. |
| **lista_compra_semana1.md**, **plan_mes_1_*.md** | Documentos de apoyo del plan de dieta. |

## Inicio rápido

1. **Versión online:** [https://serocasoftware.github.io/dietloop/webapp/](https://serocasoftware.github.io/dietloop/webapp/)
2. **Local:** desde la carpeta `webapp`, ejecuta `python -m http.server 8080` y abre `http://localhost:8080`.

Al abrir la app se elige el perfil:
- **Papá**: seguimiento de peso, plan de dieta y ejercicio.
- **Bechita**: calendario con el menú infantil de comedor (alergia frutos de cáscara).
- **Próximamente**: reservado para otro perfil.

## Requisitos

- Navegador moderno.
- Para desarrollo/local: Python 3 (opcional, para servir la webapp).

## Licencia y autor

Uso personal / familiar. Ver detalles en el repositorio.
