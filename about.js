import { displaySlider } from "./slider.js";
import { togle } from "./togelNav.js";
togle();

let cartBtn = document.querySelector(".cart-btn");
let slider = document.querySelector(".slid");
let overlayslid = document.querySelector(".slid-overlay");
let closeSlider = document.querySelector(".close-slid");
export { cartBtn, slider, overlayslid, closeSlider };
displaySlider();
