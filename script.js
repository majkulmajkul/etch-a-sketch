const sketchContainer = document.querySelector(".sketch-container");
const hiddenDiv = document.querySelector(".hidden-div");
const rainbowModeButton = document.querySelector("#rainbow-mode-button");
const resetButton = document.querySelector("#reset-button");
const changeResolutionButton = document.querySelector(
  "#change-resolution-button"
);
const primaryColorPicker = document.querySelector("#primary-color-picker");
const backgroundColorPicker = document.querySelector(
  "#background-color-picker"
);
const body = document.querySelector("body");

let mouseDown = false;

body.addEventListener("mousedown", () => {
  mouseDown = true;
});
body.addEventListener("mouseup", () => {
  mouseDown = false;
});

rainbowModeButton.addEventListener("click", () => setColor("rainbow"));

primaryColorPicker.addEventListener("input", (e) => setColor(e.target.value));
primaryColorPicker.addEventListener("change", (e) => setColor(e.target.value));
backgroundColorPicker.addEventListener("input", (e) =>
  setBackgroundColor(e.target.value)
);
backgroundColorPicker.addEventListener("change", (e) =>
  setBackgroundColor(e.target.value)
);

resetButton.addEventListener("click", (e) => setupScreen(width));
changeResolutionButton.addEventListener("click", (e) => changeResolution(e));

let color = "rgb(0, 0, 0)";
let backgroundColor = "rgb(255, 255, 255)";
let width = 32;

function setColor(newColor) {
  console.log(newColor);
  color = newColor;
}

function setBackgroundColor(newBackgroundColor) {
  // fuckery due to HEX -> RGB
  hiddenDiv.style.background = newBackgroundColor;
  newBackgroundColor = hiddenDiv.style.background;
  //end of fuckery
  const allPixels = document.querySelectorAll(".pixel");
  for (const pixel of allPixels) {
    if (pixel.style.background === backgroundColor) {
      pixel.style.background = newBackgroundColor;
    }
  }

  backgroundColor = newBackgroundColor;
}

function getColor() {
  if (color === "rainbow") {
    //to be implemented

    let color1 = Math.floor(Math.random() * 255);
    let color2 = Math.floor(Math.random() * 255);
    let color3 = Math.floor(Math.random() * 255);
    return `rgb(${color1}, ${color2}, ${color3})`;
  } else {
    return color;
  }
}

function setColorToPixel(targetPixel) {
  if (mouseDown) {
    targetPixel.style.background = getColor();
  }
}

function changeResolution() {
  let resolution = 0;
  while (resolution < 8 || resolution > 64) {
    resolution = prompt("Enter new dimension for sketch area: (8 - 64)");
  }

  setupScreen(resolution);
  const allPixels = document.querySelectorAll(".pixel");
  pixelSizeRem = 32 / resolution;
  for (const pixel of allPixels) {
    pixel.style.width = `${pixelSizeRem}rem`;
    pixel.style.height = `${pixelSizeRem}rem`;
  }
}

function setupScreen(width) {
  console.log("setupScreen clicked!");
  sketchContainer.innerHTML = "";
  sketchContainer.style.gridTemplateColumns = "auto ".repeat(width);

  for (let i = 0; i < width * width; i++) {
    let child = document.createElement("div");
    child.className = "pixel";
    child.style.background = backgroundColor;
    sketchContainer.appendChild(child);
  }

  const allPixels = document.querySelectorAll(".pixel");

  for (let pixel of allPixels) {
    pixel.addEventListener("click", (e) => setColorToPixel(e.target));
    pixel.addEventListener("mouseover", (e) => setColorToPixel(e.target));
  }
}

setupScreen(32);
