# Viaje Portugal - Agosto 2026

Sitio web de itinerario de viaje por España y Portugal (Redován → Mérida → Lisboa → Oporto → Salamanca → Redován).

## Estructura del proyecto

```
viaje_portugal/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos CSS
├── js/
│   ├── main.js             # Lógica principal de la aplicación
│   └── data/
│       ├── day1.json       # Datos del día 1
│       ├── day2.json       # Datos del día 2
│       ├── day3.json       # Datos del día 3
│       ├── day4.json       # Datos del día 4
│       ├── day5.json       # Datos del día 5
│       ├── day6.json       # Datos del día 6
│       ├── day7.json       # Datos del día 7
│       └── day8.json       # Datos del día 8
├── assets/
│   └── images/             # Imágenes y recursos
└── README.md               # Este archivo
```

## Características

- **Diseño responsive**: Funciona en móviles, tablets y escritorio
- **Navegación por días**: 8 días de itinerario con navegación intuitiva
- **Datos modulares**: Cada día está en un archivo JSON independiente
- **Contenido dinámico**: JavaScript renderiza el contenido desde los archivos JSON
- **Estilos profesionales**: Diseño elegante con colores cálidos y tipografía cuidada

## Cómo usar

### Para ver el sitio web:

1. Abre `index.html` en tu navegador
2. Navega entre los diferentes días usando los botones de navegación
3. Haz clic en las tarjetas de paradas para ver más detalles

### Para modificar el contenido:

1. Edita los archivos JSON en `js/data/` para modificar el contenido de cada día
2. Los archivos JSON tienen una estructura clara y legible
3. Los cambios se reflejan automáticamente al recargar la página

### Para modificar el diseño:

1. Edita `css/styles.css` para cambiar estilos
2. Edita `js/main.js` para modificar la funcionalidad

## Estructura de los archivos JSON

Cada archivo JSON tiene la siguiente estructura:

```json
{
  "navLabel": "DÍA 1 · SAB 15 AGO",
  "navName": "Mérida",
  "ready": true,
  "title": "Redován → Mérida",
  "date": "Sábado, 15 de agosto de 2026",
  "subtitle": "Descripción del día...",
  "alerts": [],
  "sections": [...],
  "timeline": [...],
  "summary": {...}
}
```

## Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript (ES6+)**: Lógica de la aplicación
- **JSON**: Almacenamiento de datos

## Notas

- Los precios son orientativos y pueden cambiar
- Verificar disponibilidad y horarios antes del viaje
- Agosto 2026

## Licencia

Proyecto personal para uso privado.