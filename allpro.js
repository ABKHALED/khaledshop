import { togle } from "./togelNav.js";
togle();
import { displaySlider } from "./slider.js";
import { slider, overlayslid } from "./about.js";
displaySlider();

let holder = document.querySelector(".prudects-holder");
function getallPod() {
  holder.innerHTML = `<div class='loder'></div>`;
  fetch("https://course-api.com/javascript-store-products")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let d = res
        .map((ele) => {
          return `<div class="box">
        <div class="image">
          <img src="${ele.fields.image[0].url}" alt="">
          <div class="icons">
            <a href="/prodctInfo.html?id=${ele.id}"><i class="fa-solid fa-magnifying-glass"></i></a>
            <span class="addcart-btn"><i id="${ele.id}" class="fa-solid fa-cart-shopping"></i></span>
          </div>
        </div>
        <div class="footer">
          <p>${ele.fields.name}</p>
          <span>$${ele.fields.price}</span>
        </div>
      </div>`;
        })
        .join("");
      holder.innerHTML = d;
      let addBtn = Array.from(document.querySelectorAll(".addcart-btn"));
      setItems(addBtn);
      showSlid(addBtn);
    });
}
getallPod();

let searshInput = document.querySelector("#search");
searshInput.addEventListener("input", searchFilter);
function searchFilter() {
  let invaleu = searshInput.value;
  holder.innerHTML = `<div class='loder'></div>`;
  fetch("https://course-api.com/javascript-store-products")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let d = res.filter((ele) => {
        return ele.fields.name.includes(invaleu.toLowerCase());
      });
      return d;
    })
    .then((res) => {
      if (res.length > 0) {
        let u = res
          .map((ele) => {
            return `<div class="box">
            <div class="image">
              <img src="${ele.fields.image[0].url}" alt="">
              <div class="icons">
                <a href="/prodctInfo.html?id=${ele.id}"><i class="fa-solid fa-magnifying-glass"></i></a>
                <span class="addcart-btn"><i id="${ele.id}" class="fa-solid fa-cart-shopping"></i></span>
              </div>
            </div>
            <div class="footer">
              <p>${ele.fields.name}</p>
              <span>$${ele.fields.price}</span>
            </div>
          </div>`;
          })
          .join("");
        holder.innerHTML = u;
        let addBtn = Array.from(document.querySelectorAll(".addcart-btn"));
        setItems(addBtn);
        showSlid(addBtn);
      } else {
        holder.innerHTML = `<div class='elert'>Sorry, No Products Matched Your Search</div>`;
      }
    });
}

//// using li to fillter

let lis = document.querySelectorAll(".filter li");
lis.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    lis.forEach((el) => {
      el.classList.remove("active");
      e.currentTarget.classList.add("active");
    });
    lisfilter(e.currentTarget.dataset.name);
  });
});

function lisfilter(e) {
  if (e === "all") {
    getallPod();
  } else {
    holder.innerHTML = `<div class='loder'></div>`;
    fetch("https://course-api.com/javascript-store-products")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let d = res.filter((ele) => {
          return ele.fields.company === e;
        });
        return d;
      })
      .then((res) => {
        let u = res
          .map((ele) => {
            return `<div class="box">
            <div class="image">
              <img src="${ele.fields.image[0].url}" alt="">
              <div class="icons">
                <a href="/prodctInfo.html?id=${ele.id}"><i class="fa-solid fa-magnifying-glass"></i></a>
                <span class="addcart-btn"><i id="${ele.id}" class="fa-solid fa-cart-shopping"></i></span>
              </div>
            </div>
            <div class="footer">
              <p>${ele.fields.name}</p>
              <span>$${ele.fields.price}</span>
            </div>
          </div>`;
          })
          .join("");
        holder.innerHTML = u;
        let addBtn = Array.from(document.querySelectorAll(".addcart-btn"));
        setItems(addBtn);
        showSlid(addBtn);
      });
  }
}

/// filtering by price
let f;

fetch("https://course-api.com/javascript-store-products")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    f = res;
  });
let numInpt = document.querySelector("#num");
let numShow = document.querySelector(".number");
numInpt.addEventListener("input", function () {
  let numvaleu = numInpt.value;
  numShow.innerHTML = numvaleu;
  let k = f.filter((ele) => {
    return ele.fields.price < parseInt(numvaleu);
  });
  if (k.length > 0) {
    let u = k
      .map((ele) => {
        return `<div class="box">
              <div class="image">
                <img src="${ele.fields.image[0].url}" alt="">
                <div class="icons">
                  <a href="/prodctInfo.html?id=${ele.id}"><i class="fa-solid fa-magnifying-glass"></i></a>
                  <span class="addcart-btn"><i id="${ele.id}" class="fa-solid fa-cart-shopping"></i></span>
                </div>
              </div>
              <div class="footer">
                <p>${ele.fields.name}</p>
                <span>$${ele.fields.price}</span>
              </div>
            </div>`;
      })
      .join("");
    holder.innerHTML = u;
    let addBtn = Array.from(document.querySelectorAll(".addcart-btn"));
    setItems(addBtn);
    showSlid(addBtn);
  } else {
    holder.innerHTML = `<div class='elert'>Sorry, No Products Matched Your Search</div>`;
  }
});
///////////////////////////////////////////////
/////////////////////////////////////////////
//////////////////////////////////////////////
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
      howmani(arr);
      setElementLoc(arr);
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
