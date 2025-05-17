
# 🧭 Guía de Usuario del Sistema de Menús Interactivos en A-Frame

Esta guía explica detalladamente cómo implementar y utilizar el sistema de menús interactivos desarrollado para proyectos en realidad virtual y aumentada usando **A-Frame**. Incluye descarga de scripts, estructura de archivos, configuración y ejemplos prácticos para desarrolladores o futuros estudiantes que quieran reutilizar esta solución.

---

## 1. 📦 Descarga de Scripts Necesarios

Antes de comenzar, asegúrate de incluir los siguientes archivos JavaScript en tu proyecto:

### Scripts principales:

- **`button.js`**  
  Crea botones personalizables:
  - Tamaño del botón
  - Texto (etiqueta) del botón
  - Posición y tamaño de la etiqueta
  - Color y visibilidad
  - Componente `pressable` para interacción

- **`initMenu.js`**  
  Establece el formato, apariencia y distribución de cada menú.

- **`pressable.js`**  
  Permite presionar botones con las manos (VR/AR) o con el ratón (modo escritorio).

### Scripts adicionales para sliders:

- **`pinchable.js`**  
  Permite arrastrar sliders con los dedos o punteros.

- **`slider.js`**  
  Crea el componente de slider como tal (barra + controlador).

- **`size-change.js`**  
  Controla el cambio de tamaño de objetos a través del slider.

---

## 2. 🧾 Creación del archivo `index.html`

Este archivo es el punto de entrada de tu escena.

### Librerías necesarias:

```html
<script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aframe-super-hands-component@4.0.5/dist/aframe-super-hands-component.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aframe-physics-system@4.0.1/dist/aframe-physics-system.min.js"></script>
```

Estas librerías permiten trabajar con A-Frame, manipular objetos con las manos (VR/AR) y aplicar física a las entidades.

### Scripts del sistema de menús:

```html
<script src="js/initMenu.js"></script>
<script src="js/button.js"></script>
<script src="js/pressable.js"></script>
<script src="js/menu.js"></script>
<script src="js/slider.js"></script>
<script src="js/pinchable.js"></script>
<script src="js/size-change.js"></script>
```

### Controladores de entrada (interacción):

```html
<a-entity hand-controls="hand: left" super-hands></a-entity>
<a-entity hand-controls="hand: right" super-hands></a-entity>
<a-entity laser-controls="hand: right"></a-entity>
```

Estos elementos permiten interactuar con los menús desde diferentes dispositivos (manos, ratón, puntero láser).

### Decoración de la escena:

Opcionalmente, puedes añadir una habitación o entorno de trabajo con:

- Fondos en 360° (`<a-sky>` con imágenes HDR)
- Entidades geométricas (`<a-box>`, `<a-sphere>`, etc.)
- Texturas, luces, sonidos, etc.

---

## 3. 🧩 Archivo `scene.json`: Creación de Menús

Este archivo es el corazón de la estructura de menús. Contiene la definición de los menús, botones, propiedades visuales y acciones que cada botón debe ejecutar.

### 🧪 Ejemplo completo:

```json
{
  "menuP": {
    "id": "menuinicio",
    "position": "0 1.5 -0.5",
    "visible": "true",
    "grabbable": "true",
    "buttons": [
      {
        "label": "Start",
        "id": "startButton",
        "position": "0 0 0",
        "posetx": "0.092",
        "posety": "-0.01",
        "widthet": "0.15",
        "color": "#2F6A31",
        "visible": "true",
        "function1": "nextMenu",
        "parameter1f1": "menuinicio",
        "parameter2f1": "submenu1",
        "menuC1": {
          "id": "submenu1",
          "position": "0 1.5 -0.5",
          "visible": "false",
          "grabbable": "false",
          "buttons": [
            {
              "label": "Bar",
              "id": "barrasButton",
              "position": "0 0 0",
              "color": "#2F6A31",
              "posetx": "0.092",
              "posety": "-0.01",
              "widthet": "0.1",
              "visible": "false",
              "function1": "changeBoolean",
              "parameter1f1": "bar",
              "function2": "nextMenu",
              "parameter1f2": "submenu1",
              "parameter2f2": "submenu2",
              "menuC2": {
                // Submenú adicional
              }
            }
          ]
        }
      }
    ]
  }
}
```

Cada menú puede contener botones, y cada botón puede ejecutar una o varias funciones con parámetros. Además, puedes definir submenús (`menuC1`, `menuC2`, etc.) de forma anidada.

---

## 4. 🧠 Script `menu.js`: Controlador de Lógica

Este archivo contiene toda la lógica de comportamiento de los botones, menús, sliders y la navegación entre pantallas.

### Funciones más relevantes:

- `nextMenu()`: cambia entre menús
- `changeBoolean()`: activa/desactiva elementos
- `applyMenuPosition()`: ajusta la posición entre menús
- `changeGrabbable()`: habilita o desactiva la capacidad de agarrar menús

### 🔁 Ejemplo real de función `nextMenu`:

```js
nextMenu: function (prevM, nextM){
  this.lastMenuPosition = this.getMenuPosition(prevM);
  this.changeGrabbable(nextM, prevM);
  prevM.setAttribute('visible', false);
  const buttons2 = prevM.querySelectorAll('[id]');
  buttons2.forEach(button => {
    button.setAttribute('visible', false);
  });
  setTimeout(() => {
    this.applyMenuPosition(nextM, this.lastMenuPosition);
    nextM.setAttribute('visible', true);
    const buttons = nextM.querySelectorAll('[id]');
    buttons.forEach(button => {
      button.setAttribute('visible', true);
    });
    if(nextM == this.menuinicio){
      if(this.isDarkMode){
        this.darkButtonEl.setAttribute('visible', false);
      }else{
        this.lightButtonEl.setAttribute('visible', false);
      }
    }
  }, 500);
}
```

---

## 5. ✅ Recomendaciones Finales

- Usa `scene.json` como el archivo central de la estructura de menús.
- Evita repetir IDs en los botones o menús.
- Prueba tu interfaz en VR, AR y escritorio para garantizar compatibilidad.
- Utiliza colores, tamaños y posiciones coherentes para mejorar la experiencia del usuario.

### Estructura recomendada del proyecto:

```
├── index.html
├── scene.json
├── js/
│   ├── button.js
│   ├── initMenu.js
│   ├── pressable.js
│   ├── menu.js
│   ├── slider.js
│   ├── pinchable.js
│   └── size-change.js
└── assets/ (opcional para texturas, sonidos, fondos, etc.)
```

---

## 6. 📌 Nota Final

Este sistema está diseñado para ser **modular y reutilizable**. Puedes adaptar los menús a diferentes contextos, como:

- Representación de datos
- Diseño de interiores
- Navegación en experiencias VR/AR
- Reproducción de sonidos o medios

Gracias a su estructura clara, los desarrolladores pueden extender o personalizar las funcionalidades fácilmente sin necesidad de rehacer la lógica desde cero.