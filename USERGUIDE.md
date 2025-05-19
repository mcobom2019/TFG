# 🧭 User Guide for the Interactive Menu System in A-Frame

This guide provides a detailed explanation of how to implement and use the interactive menu system developed for virtual and augmented reality projects using **A-Frame**. It includes script downloads, file structure, configuration, and practical examples for developers or future students looking to reuse this solution.

---

## 1. 📦 Downloading the Required Scripts

Before getting started, make sure to include the following JavaScript files in your project:

### Main scripts:

- **`button.js`**  
  Creates customizable buttons:
  - Button size
  - Button label text
  - Label position and size
  - Color and visibility
  - `pressable` component for interaction

- **`initMenu.js`**  
  Sets the format, appearance, and layout of each menu.

- **`pressable.js`**  
  Enables buttons to be pressed using hands (VR/AR) or a mouse (desktop mode).

### Additional scripts for sliders:

- **`pinchable.js`**  
  Allows sliders to be dragged using fingers or pointers.

- **`slider.js`**  
  Creates the slider component (bar + handle).

- **`size-change.js`**  
  Controls object size changes via the slider.

---

## 2. 🧾 Creating the `index.html` File

This file is the entry point of your scene.

### Required libraries:

```html
<script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aframe-super-hands-component@4.0.5/dist/aframe-super-hands-component.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aframe-physics-system@4.0.1/dist/aframe-physics-system.min.js"></script>
```

These libraries allow you to work with A-Frame, manipulate objects with your hands (VR/AR), and apply physics to entities.

### Menu system scripts:

```html
<script src="js/initMenu.js"></script>
<script src="js/button.js"></script>
<script src="js/pressable.js"></script>
<script src="js/menu.js"></script>
<script src="js/slider.js"></script>
<script src="js/pinchable.js"></script>
<script src="js/size-change.js"></script>
```

### Input controllers (interaction):

```html
<a-entity id="leftHand" hand-tracking-controls="hand: left" hand-tracking-grab-controls="hand: left">
<a-entity id="rightHand" hand-tracking-controls="hand: right" hand-tracking-grab-controls="hand: right"></a-entity>
<a-entity cursor="fuse: false; rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
```

These entities allow interaction with menus through different devices (hands, mouse, laser pointer).

### Scene decoration:

Optionally, you can add a room or workspace with:

- 360° backgrounds (`<a-sky>` with HDR images)
- Geometric entities (`<a-box>`, `<a-sphere>`, etc.)
- Textures, lights, sounds, etc.

---

## 3. 🧩 `scene.json` File: Menu Creation

This file is the core of the menu structure. It contains the definition of menus, buttons, visual properties, and the actions that each button must execute.

### 🧪 Full example:

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
                // Additional submenu
              }
            }
          ]
        }
      }
    ]
  }
}
```

Each menu can contain buttons, and each button can execute one or more functions with parameters. You can also define nested submenus (`menuC1`, `menuC2`, etc.).

---

## 4. 🧠 `menu.js` Script: Logic Controller

This file contains all behavior logic for buttons, menus, sliders, and navigation between screens.

### Key functions:

- `nextMenu()`: switches between menus
- `changeBoolean()`: toggles elements on/off
- `applyMenuPosition()`: adjusts positioning between menus
- `changeGrabbable()`: enables or disables menu grabbing

### 🔁 Real example of `nextMenu` function:

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

## 5. ✅ Final Recommendations

- Use `scene.json` as the central file for the menu structure.
- Avoid repeating IDs for buttons or menus.
- Test your interface in VR, AR, and desktop to ensure compatibility.
- Use consistent colors, sizes, and positions to improve user experience.

### Recommended project structure:

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
└── assets/ (optional for textures, sounds, backgrounds, etc.)
```

---

## 6. 📌 Final Note

This system is designed to be **modular and reusable**. You can adapt the menus to different contexts such as:

- Data visualization
- Interior design
- Navigation in VR/AR experiences
- Playback of sounds or media

Thanks to its clear structure, developers can easily extend or customize the features without needing to rebuild the logic from scratch.
