# Sistema de Diagnóstico Interactivo y Generador de PDF

Este repositorio contiene un sistema de evaluación interactivo, totalmente ejecutado en el lado del cliente, que mapea las respuestas del usuario a una cuadrícula de coordenadas 2D dinámica, para posteriormente generar un reporte PDF personalizado basado en sus resultados específicos.

El proyecto está diseñado para ser altamente modular, independiente y completamente alojable en servidores de archivos estáticos como **GitHub Pages**, ya que no requiere infraestructura de backend.

## Características Principales

- **Flujo Visual Interactivo (Phaser.js):**
  Utiliza el framework Phaser.js para crear una interfaz cinemática "tipo terminal". La cámara se desplaza y hace zoom dinámicamente sobre una estructura de nodos de una cuadrícula en función de los ejes evaluados por cada pregunta.
  
- **Sistema de Evaluación de Dos Ejes (Mapeo de Datos X/Y):**
  Las respuestas afectan a dos ejes distintos (X e Y), construyendo progresivamente un conjunto de coordenadas a lo largo del cuestionario.
  
- **Cálculo Basado en Cuadrantes:**
  Al completar la encuesta, las coordenadas finales del usuario determinan su ubicación dentro de una matriz de cuadrantes personalizada (ej. Bajo-Bajo, Alto-Bajo, Bajo-Alto, Alto-Alto).

- **Generación Dinámica de PDF (jsPDF):**
  Incluye una funcionalidad de descarga de PDF totalmente personalizada en el lado del cliente. El documento resultante se formatea dinámicamente para acomodar textos de distintas longitudes, asegurando una apariencia estética y profesional sin que los textos se superpongan, independientemente de qué tan largas sean las descripciones de los cuadrantes.

- **Arquitectura Sin CORS:**
  Las preguntas, el texto de los ejes y la lógica de los cuadrantes se han externalizado en archivos `.js` independientes (en lugar de archivos JSON) para evitar las restricciones de CORS durante el desarrollo local o al servir el sitio estáticamente a través de GitHub Pages.

## Tecnologías Utilizadas

- **HTML5 y CSS3** para la estructura de la interfaz de usuario y el diseño.
- **JavaScript "Vanilla" (ES6)** para la lógica principal y el mapeo de objetos.
- **Phaser 3** para la navegación de nodos en canvas y las transiciones de la cámara.
- **jsPDF** para la creación interactiva de archivos PDF y su respectivo formato de texto.

## Instalación y Despliegue

Dado que la aplicación no depende de un procesador de backend (servidor):
1. Clona el repositorio.
2. Abre `index.html` directamente en cualquier navegador moderno para probarlo localmente.
3. Despliégalo de manera sencilla en **GitHub Pages** (o en cualquier host estático) simplemente apuntando el directorio principal al repositorio.

## Personalización

Puedes adaptar fácilmente este sistema para crear tus propios cuestionarios sin cambiar el script principal, con tan solo editar los archivos de datos:
- `Questions.js`: Define tus preguntas, especifica qué eje modifican (`x` o `y`) y establece el valor de cada opción.
- `quadrants.js`: Define los nombres y las descripciones textuales detalladas que cubren la matriz de resultados finales.
- `axes.js` y `descriptions.js`: Ajusta los nombres de los ejes y define el texto de retroalimentación específico para la puntuación en un eje en particular.
