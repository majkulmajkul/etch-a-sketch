const sketchContainer = document.querySelector(".sketch-container");

for (let i = 0; i < 9; i++) {
  let child = document.createElement("div");
  child.textContent = "x";
  child.className = "pixel";
  sketchContainer.appendChild(child);
}

const allPixels = document.querySelectorAll(".pixel");
console.log("All pixels:", allPixels);

for (let pixel of allPixels) {
  pixel.addEventListener("click", handleClick);
}

function handleClick(e) {
  const target = e.target;
  target.style.background = "red";
}
