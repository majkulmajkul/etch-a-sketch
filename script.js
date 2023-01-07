const sketchContainer = document.querySelector(".sketch-container");
const body = document.querySelector("body");

let mouseDown = false;
body.addEventListener("mousedown", () => {
  mouseDown = true;
});
body.addEventListener("mouseup", () => {
  mouseDown = false;
});

let color = "blue";

function getColor() {
  if (color === "rgb") {
    //to be implemented
    return undefined;
  } else {
    return color;
  }
}

function setColorToPixel(targetPixel) {
  if (mouseDown) {
    targetPixel.style.background = getColor();
  }
}

function setupScreen(width) {
  sketchContainer.innerHTML = "";
  sketchContainer.style.gridTemplateColumns = "auto ".repeat(width);

  for (let i = 0; i < width * width; i++) {
    let child = document.createElement("div");
    // child.textContent = "x";
    child.className = "pixel";
    sketchContainer.appendChild(child);
  }

  const allPixels = document.querySelectorAll(".pixel");
  console.log("All pixels:", allPixels);

  for (let pixel of allPixels) {
    pixel.addEventListener("click", (e) => setColorToPixel(e.target));
    pixel.addEventListener("mouseover", (e) => setColorToPixel(e.target));
  }
}

setupScreen(32);
