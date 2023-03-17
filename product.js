import { togle } from "./togelNav.js";
togle();
import { displaySlider } from "./slider.js";
import { slider, overlayslid } from "./about.js";
displaySlider();
let producBox = document.querySelector(".prod-info .box");
let productTitle = document.querySelector(".prodct-big-title");
function getProduct() {
  let prames = new URLSearchParams(window.location.search);
  let id = prames.get("id");
  producBox.innerHTML = `<div class='loading'>Loding . . .</div>`;
  fetch(`https://course-api.com/javascript-store-single-product?id=${id}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      productTitle.innerHTML = res.fields.name;
      producBox.innerHTML = `<div class="left-side id='${res.id}">
      <div class="image">
        <img src="${res.fields.image[0].url}" alt="">
      </div>
    </div>
    <div class="right-side" id='${res.id}'>
      <h3>${res.fields.name}</h3>
      <p class="comp">BY ${res.fields.company}</p>
      <span class="price">$${res.fields.price}</span>
      <div class="colores" id='${res.id}'>
        <span class="first"  style="background-color:${res.fields.colors[0]} ;"></span>
        <span class="second" style="background-color:${res.fields.colors[1]};"></span>
      </div>
      <p class="desc" id='${res.id}'>
        ${res.fields.description}
      </p id='${res.id}'>
      <button class="addcart-btn" id='${res.id}'>ADD TO CART</button>
    </div>`;
      let addBtn = Array.from(document.querySelectorAll(".addcart-btn"));
      setItems(addBtn);
      showSlid(addBtn);
    });
}

getProduct();
let sliderHolder = document.querySelector(".slid .holder");
let pp = [];
let arr = [];

if (localStorage.getItem("khaled")) {
  let d = localStorage.getItem("khaled");
  pp = d.split(",");
  //

  //
  arr = pp;
  let nee = Array.from(new Set(pp));

  nee.forEach((ele) => {
    fetch("https://course-api.com/javascript-store-products")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let k = res.filter((el) => {
          return el.id === ele;
        });
        return k;
      })
      .then((res) => {
        let p = res
          .map((ele) => {
            return `<div class="box" id="${ele.id}">
                     <div class="left-side">
                      <img src="${ele.fields.image[0].url}" alt="">
                      </div>
                           <div class="midel-side">
                               <p>${ele.fields.name}</p>
                               <p class = "price">$${ele.fields.price}</p>
                               <p class="remove">remove</p>
                           </div>
                           <div class="right-side">
                               <i class="fa-solid fa-arrow-up"></i>
                               <span id="${ele.id}" class="pice">0</span>
                               <i class="fa-solid fa-arrow-down"></i>
                           </div>`;
          })
          .join("");
        sliderHolder.innerHTML += p;
        let pice = Array.from(document.querySelectorAll(".pice"));
        let boxes = Array.from(document.querySelectorAll(".slid .holder .box"));
        let remove = Array.from(document.querySelectorAll(".remove"));
        remBtn(remove);
        settoteltal(pp);
        getpises(pp, pice, boxes);
        howmani(arr);
        // remBtn(remove, nee);
      });
  });
}
if (localStorage.getItem("info")) {
  let aar = localStorage.getItem("info");
  console.log(aar);
  if (aar.includes(",")) {
    let dre = aar.split(",");
    console.log(dre);
    let u = 0;
    for (let i = 0; i < dre.length; i++) {
      u += +dre[i];
    }
    let totle = document.querySelector(".tootle-amount");
    totle.innerText = u;
  } else {
    let totle = document.querySelector(".tootle-amount");
    totle.innerText = aar;
  }
}
/////

////

let newArr = [];
function setItems(addBtn) {
  addBtn.map((ele) => {
    ele.addEventListener("click", function (e) {
      sliderHolder.innerHTML = "";

      let id = e.target.id;
      arr.push(id);

      newArr = Array.from(new Set(arr));
      newArr.forEach((ele) => {
        fetch("https://course-api.com/javascript-store-products")
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            let k = res.filter((el) => {
              return el.id === ele;
            });
            return k;
          })
          .then((res) => {
            let p = res
              .map((ele) => {
                return `<div class="box" id="${ele.id}">
                     <div class="left-side">
                      <img src="${ele.fields.image[0].url}" alt="">
                      </div>
                           <div class="midel-side">
                               <p>${ele.fields.name}</p>
                               <p class = "price">$${ele.fields.price}</p>
                               <p class="remove">remove</p>
                           </div>
                           <div class="right-side">
                               <i class="fa-solid fa-arrow-up"></i>
                               <span id="${ele.id}" class="pice">0</span>
                               <i class="fa-solid fa-arrow-down"></i>
                           </div>`;
              })
              .join("");
            sliderHolder.innerHTML += p;
            let pice = Array.from(document.querySelectorAll(".pice"));
            let boxes = Array.from(
              document.querySelectorAll(".slid .holder .box")
            );
            let remove = Array.from(document.querySelectorAll(".remove"));
            getpises(arr, pice, boxes);
            settoteltal(arr);
            add(arr);

            setElementLoc(arr);
            remBtn(remove);
            howmani(arr);
          });
      });
    });
  });
}

function getpises(arr, pice, boxes) {
  boxes.forEach((ele) => {
    const count = arr.reduce((accumulator, value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});
    let spann = document
      .querySelector(".slid .holder")
      .querySelector(`#${ele.id}`)
      .querySelector(`#${ele.id}`);
    spann.innerHTML = count[ele.id];
  });
}

function settoteltal(arr) {
  let up = document.querySelectorAll(".slid .holder .box .fa-arrow-up ");
  let dozn = document.querySelectorAll(".slid .holder .box .fa-arrow-down ");
  up.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      arr.push(e.target.nextElementSibling.id);

      setElementLoc(arr);
      e.target.nextElementSibling.innerText++;
      add();
      howmani(arr);
    });
  });
  dozn.forEach((ele) => {
    let kkk = arr;
    ele.addEventListener("click", function (e) {
      let idd = e.target.previousElementSibling.id;

      if (e.target.previousElementSibling.innerText > 0) {
        e.target.previousElementSibling.innerText--;
        // howmani(arr);
        let indexr = arr.indexOf(idd);
        arr.splice(indexr, 1);
        setElementLoc(arr);
        howmani(arr);
        add();
      }

      //
      if (e.currentTarget.previousElementSibling.innerText <= 0) {
        e.currentTarget.parentElement.parentElement.remove();
        // arr = arr.filter((ele) => {
        //   return ele !== e.currentTarget.id;
        // });
        // setElementLoc(arr);
        // howmani(arr);
        add();
        setElementLoc(arr);
        howmani(arr);
      }
      // arr = kkk;

      // if (e.target.previousElementSibling.innerText > 0) {
      //   e.target.previousElementSibling.innerText--;

      //   // howmani(arr);
      // }

      // //
      // if (e.currentTarget.previousElementSibling.innerText <= 0) {
      //   e.currentTarget.parentElement.parentElement.remove();
      //   // arr = arr.filter((ele) => {
      //   //   return ele !== e.currentTarget.id;
      //   // });
      //   // setElementLoc(arr);
      //   // howmani(arr);
      // }
      // // arr = kkk;
      // let indexr = arr.indexOf(idd);
      // arr.splice(indexr, 1);
      // setElementLoc(arr);
      // howmani(arr);
      // add();
    });
  });
}

function add() {
  let boxes = Array.from(document.querySelectorAll(".slid .holder .box"));
  let arr = [];
  boxes.forEach((ele) => {
    let price = ele.querySelector(".price").innerText;
    let pr = parseInt(price.slice(1));
    let pice = ele.querySelector(".pice").innerText;
    let to = pr * +pice;
    arr.push(to);

    let u = 0;
    for (let i = 0; i < arr.length; i++) {
      u += arr[i];
    }
    let totle = document.querySelector(".tootle-amount");

    totle.innerText = u;
    ste2(arr);
  });
}

function setElementLoc(arr) {
  localStorage.setItem("khaled", arr);
}

function ste2(arr) {
  localStorage.setItem("info", arr);
}

function howmani(arr) {
  let number = document.querySelector(".count");
  number.innerText = arr.length;
}

function remBtn(rem) {
  rem.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      let pice =
        e.target.parentElement.parentElement.querySelector(".pice").innerText;
      let pricef =
        e.target.parentElement.parentElement.querySelector(".price").innerText;
      let pr = parseInt(pricef.slice(1));
      let yy = pr * parseInt(pice);

      let totle = document.querySelector(".tootle-amount");

      totle.innerText -= yy;
      console.log(pice);
      e.target.parentElement.parentElement.remove();
      arr = arr.filter((ele) => {
        return ele !== e.target.parentElement.parentElement.id;
      });
      console.log(arr);
      howmani(arr);
      setElementLoc(arr);
      ////
      let boxes = Array.from(document.querySelectorAll(".slid .holder .box"));
      let hh = [];
      boxes.forEach((ele) => {
        let price = ele.querySelector(".price").innerText;
        let prr = parseInt(price.slice(1));
        hh.push(prr);
        hh = hh.filter((el) => {
          return el !== pr;
        });
      });
      ste2(hh);

      // ste2(hh);
      settoteltal(arr);
    });
  });
}

let over = document.querySelector(".slid-overlay");
function showSlid(addBtn) {
  addBtn.forEach((ele) => {
    ele.addEventListener("click", function () {
      slider.classList.add("active");
      over.classList.add("active");
    });
  });
}
