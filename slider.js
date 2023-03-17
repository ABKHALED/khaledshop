import { cartBtn, slider, overlayslid, closeSlider } from "./about.js";

function displaySlider() {
  cartBtn.addEventListener("click", function () {
    slider.classList.add("active");
    overlayslid.classList.add("active");
  });
  closeSlider.addEventListener("click", function () {
    slider.classList.remove("active");
    overlayslid.classList.remove("active");
  });
}

export { displaySlider };
