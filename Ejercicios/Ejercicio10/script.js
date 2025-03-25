document.addEventListener("DOMContentLoaded", () => {
    const btnBox = document.getElementById("btn-box");
    const scene = document.querySelector("a-scene");

    btnBox.addEventListener("click", () => {
        const newBox = document.createElement("a-box");
        newBox.setAttribute("color", "green");
        newBox.setAttribute("position", `${Math.random() * 20 - 1} 1 -3`);
        scene.appendChild(newBox);
    });
});

