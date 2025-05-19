# Exploration of Hand-Manipulable Interfaces in Extended Reality
## Functional Description

### General Overview

The developed project is an immersive data visualization application in virtual reality using web technologies such as **A-Frame**, **WebXR**, and **BabiaXR**. The scenes are designed to be accessible from various devices, although full functionality is experienced using **Meta Quest 3** VR headsets, particularly leveraging **hand interaction** as the main method of navigation and control.

The system allows the user to access a main menu where, through interactive buttons, they can navigate through different submenus to reach data selection and visualization. This visualization is presented through pie or bar charts, and generation of 3D shapes such as beds, chairs, or tables from `.glb` files—all based on a **JSON** file containing structured data.

All interface elements (buttons, menus, sliders, etc.) are designed to respond to touch using the user’s hands, thanks to **WebXR Hand Tracking** support. Additionally, functionality has been added to grab and move panels (*grabbable*), allowing for a more personalized and flexible user experience.

---

### General Structure and Operation

The main entry point of the project is the **index.html** file, which is responsible for importing all the libraries needed for the scene to function. Among the most important are:

- `aframe.min.js`: base library for creating WebVR/WebXR scenes with A-Frame 
- `aframe-hand-tracking-controls-extras.js` and `hand-tracking-controls-extras-components.js`: used to enable and enhance hand tracking on compatible VR devices 
- `aframe-environment-component.js`: allows quick creation of immersive environments, like a room 
- `aframe-rounded.js`: used for custom aesthetic elements

Additionally, the following key scripts are imported:

- `menu.js` (main script) 
- `initMenu.js` 
- `button.js` 
- `pressable.js` 
- `pinchable.js` 
- `size-change.js` 
- `slider.js`

Within the `<a-scene>` tag, the custom **menu** component (defined in `menu.js`) is instantiated, and input controllers (mouse, hands, VR controllers) are configured, as well as the visual environment of the scene (a room with walls, ceiling, floor, windows, and photographic background).

---

### Key Components and Their Functionality

#### `menu.js`

Main component of the project. Responsible for:

- Reading the `scene.json` file where the scene structure is defined 
- Automatically creating the specified menus and buttons 
- Associating functions to each button according to the JSON configuration 
- Handling complex features such as:
  - Minimizing/maximizing menus 
  - Switching between menus 
  - Switching modes (day/night) 
  - Positioning/rotating menus 
  - Enabling/disabling interactivity (*grabbable*) 
- Managing visibility and navigation states via internal booleans 
- Allowing feature extension through specific functions

#### `scene.json`

Dynamic configuration file. Defines:

- Menus with properties such as ID, visibility, position, and whether they are *grabbable* 
- Buttons with:
  - Visible label (or "noLabel") 
  - Position within the menu 
  - Label text position 
  - Size and color 
  - Associated functions and parameters

This file is read by `menu.js` to generate the interactive interface without manually coding each button.

#### `button.js`

Defines the appearance and behavior of buttons:

- Size, color, and shape 
- Label (text), position, and size 
- Button position and rotation 
- Interaction via mouse or hands (VR detection)

#### `initMenu.js`

Defines the base appearance of menus:

- Represented as panels with rounded corners 
- Metallic gray color 
- Configurable size (width, height, border radius)

#### `pressable.js`

Adds the ability to detect physical presses on buttons, simulating a realistic “button press” experience. Compatible with both hands and mouse.

#### `pinchable.js`

Enables "pinch" gestures on elements, designed for sliders. Also supports mouse interaction.

#### `size-change.js`

Allows changing the size of scene elements through sliders. It interprets the current value and modifies the corresponding entity’s scale.

#### `slider.js`

Defines the visual and functional aspects of an interactive slider:

- Combines `pinchable.js` and `size-change.js` 
- Its main function is to adjust the size of generated diagrams

---

### System Usage Guide (From Scratch)

1. Create `index.html` and import:
   - Basic libraries: A-Frame, environment, hand-tracking, etc. 
   - Required scripts: `menu.js`, `initMenu.js`, `button.js`, etc.

2. Within the `<a-scene>` tag, add the `menu` component and define the input controllers (mouse, hands, VR).

3. Design the `scene.json` file:
   - Define existing menus 
   - Define buttons within each menu 
   - Set the functions each button will execute 
   - Set positions, visibility, labels, colors, etc.

4. Extend functionalities by developing additional functions inside `menu.js` (e.g., activate music, create charts, change colors, etc.)

5. Include scripts like `pressable.js`, `pinchable.js`, `slider.js`, and `size-change.js` to enable advanced interaction for buttons and sliders.
