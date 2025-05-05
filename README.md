# Descripción Funcional. Exploración de Interfaces Manipulables con Manos en Realidad Extendida

## Descripción General

El proyecto desarrollado consiste en una aplicación inmersiva de visualización de datos en realidad virtual utilizando tecnologías web como **A-Frame**, **WebXR** y **BabiaXR**. Las escenas están diseñadas para ser accesibles desde distintos dispositivos, aunque su funcionalidad completa se experimenta mediante el uso de gafas de realidad virtual **Meta Quest 3**, aprovechando especialmente la interacción con las manos como principal método de navegación y control.

El sistema permite al usuario acceder a un menú principal en el que, mediante botones interactivos, puede navegar por distintos submenús hasta llegar a la selección y representación de los datos. Esta visualización se realiza mediante diagramas circulares o de barras, generación de formas como camas, sillas o mesas a partir de archivos `.glb`, todo ello generado a partir de un archivo **JSON** que contiene los datos estructurados.

Todos los elementos de la interfaz (botones, menús, sliders, etc.) han sido diseñados para responder al tacto utilizando las manos del usuario gracias al soporte de **WebXR Hand Tracking**. Además, se ha añadido la funcionalidad de agarrar y mover los paneles (*grabbable*), permitiendo así una experiencia de usuario más personalizada y flexible.

## Estructura General y Funcionamiento

El punto de entrada principal del proyecto es el archivo **index.html**, que se encarga de importar todas las librerías necesarias para el funcionamiento de la escena. Entre las más importantes, destacan:

* `aframe.min.js`: biblioteca base para crear escenas WebVR/WebXR con A-Frame.
* `aframe-hand-tracking-controls-extras.js` y `hand-tracking-controls-extras-components.js`: utilizadas para habilitar y mejorar la detección y el seguimiento de manos en dispositivos VR compatibles.
* `aframe-environment-component.js`: permite crear un entorno envolvente de forma rápida, como una habitación.
* `aframe-rounded.js`: utilizada para elementos con estética personalizada.

Además, se importan los siguientes scripts clave:

* `menu.js` (script principal)
* `initMenu.js`
* `button.js`
* `pressable.js`
* `pinchable.js`
* `size-change.js`
* `slider.js`

Dentro de la etiqueta `<a-scene>`, se instancia la componente personalizada **menu** (definida en `menu.js`), y se configuran los controladores de entrada (ratón, manos, mandos VR), así como el entorno visual de la escena (habitáculo con paredes, techo, suelo, ventanales y fondo fotográfico).

## Componentes Clave y su Funcionalidad

### `menu.js`

Componente principal del proyecto. Se encarga de:

* Leer el archivo `scene.json` donde se define la estructura de la escena.
* Crear automáticamente los menús y botones especificados.
* Asociar funciones a cada botón según la configuración del JSON.
* Controlar funcionalidades complejas como:

  * Minimizar/maximizar menús.
  * Cambiar de menú.
  * Cambiar entre modos (día/noche).
  * Posicionar/rotar los menús.
  * Activar/desactivar interactividad (*grabbable*).
* Gestionar el estado de visibilidad y navegación mediante booleanos internos.
* Permitir la extensión de funcionalidades con funciones específicas.

### `scene.json`

Archivo de configuración dinámica. Define:

* Menús con propiedades como ID, visibilidad, posición, y si es *grabbable*.
* Botones con:

  * Etiqueta visible (o "noLabel").
  * Posición en el menú.
  * Posición del texto (label).
  * Tamaño y color.
  * Funciones asociadas y parámetros.

Este archivo es leído por `menu.js` para generar la interfaz interactiva sin programación manual de cada botón.

### `button.js`

Define apariencia y comportamiento de botones:

* Tamaño, color y forma.
* Etiqueta (label), posición y tamaño.
* Posición y rotación del botón.
* Interacción mediante ratón o manos (detección VR).

### `initMenu.js`

Define la apariencia base de los menús:

* Representados como paneles con esquinas redondeadas.
* Color gris metálico.
* Tamaño configurable (ancho, alto, radio de borde).

### `pressable.js`

Añade capacidad de detectar presiones físicas sobre botones, simulando una experiencia realista de "tocar un botón". Compatible con manos y ratón.

### `pinchable.js`

Habilita gestos de "pinch" (pellizco) sobre elementos, diseñado para sliders. Soporta también interacción con ratón.

### `size-change.js`

Permite cambiar el tamaño de elementos de la escena mediante sliders. Interpreta el valor actual y modifica la escala de la entidad correspondiente.

### `slider.js`

Define funcional y visualmente un slider interactivo:

* Combina `pinchable.js` y `size-change.js`.
* Su función principal es ajustar el tamaño de los diagramas generados.

## Guía de Uso del Sistema (Desde Cero)

1. Crear `index.html` e importar:

   * Librerías básicas: A-Frame, environment, hand-tracking, etc.
   * Scripts necesarios: `menu.js`, `initMenu.js`, `button.js`, etc.

2. En la etiqueta `<a-scene>`, añadir la componente `menu` y definir los controladores de entrada (ratón, manos, VR).

3. Diseñar el archivo `scene.json`:

   * Definir menús existentes.
   * Botones en cada menú.
   * Funciones que ejecutará cada botón.
   * Posiciones, visibilidades, etiquetas, colores, etc.

4. Ampliar funcionalidades desarrollando funciones adicionales dentro de `menu.js` (activar música, crear gráficos, cambiar colores, etc.).

5. Incluir scripts `pressable.js`, `pinchable.js`, `slider.js` y `size-change.js` para dotar de interacción avanzada a botones y sliders.
