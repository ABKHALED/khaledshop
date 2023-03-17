let links = document.querySelector(".links");
let bur = document.querySelector(".burger");
let clos = document.querySelector("#nav-close");
let overlay = document.querySelector(".overlay-po");
function togle() {
  bur.addEventListener("click", function () {
    links.classList.add("active");
    overlay.classList.add("active");
  });
  clos.addEventListener("click", function () {
    links.classList.remove("active");
    overlay.classList.remove("active");
  });
}
togle();

export { togle };
