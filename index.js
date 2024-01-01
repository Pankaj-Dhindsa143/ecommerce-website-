let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots");
let totel_slide = slides.length;
let preloader = document.querySelector(".loder")
let i = (index = 0);





function myloader(){
  setInterval(function () {
    preloader.style.display ="none";

  }, 1500);
}
// document.getElementById("next").addEventListener("click" ,function(){
//     index += 1;
//     GoSlider(index)
// });
// document.getElementById("prve").addEventListener("click" ,function(){
//     i -= 1;
//     GoSlider(index)
// });
setInterval(function () {
  index += 1;
  GoSlider(index);
}, 2000);
function GoSlider(x) {
  if (x > totel_slide - 1) {
    index = 0;
  }
  if (x < 0) {
    index = totel_slide - 1;
  }
  if (x < totel_slide && x >= 0) {
    index = x;
  }

  for (i = 0; i < totel_slide; i++) {
    slides[i].classList.remove("Active");
    dots[i].classList.remove("Active_indi");
  }
  slides[index].classList.add("Active");
  dots[index].classList.add("Active_indi");
}

// <==========
// sticky navvar
// ==============>

const nav = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 50) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

let product = document.querySelector(".product");
let cratData = document.querySelector(".cratData");
let Dynamic_count = document.querySelector(".Dynamic-count");
let total = document.querySelector(".total")
let arrr = [];
let calculteTotal =[];
// get data from api

async function GetData() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  console.log(data);

  data.map((ele) => {
    let productMainDiv = document.createElement("div");
    let CreatImgElm = document.createElement("img");
    let CreatTitle = document.createElement("p");
    let CreatPriceElm = document.createElement("p");
    let CreatBtn = document.createElement("button");
    let btnText = document.createTextNode("Add to card");
    let CreatPriceText = document.createTextNode(`Pric : $${ele.price}`)
    let CreatTextTitle = document.createTextNode(`${ele.title.slice(0,35)}...`);
   
    CreatImgElm.setAttribute("src", ele.image);
    CreatImgElm.setAttribute("class", "images");
    productMainDiv.setAttribute("class" , "main-div");
    CreatTitle.appendChild(CreatTextTitle);
    CreatPriceElm.setAttribute("class", "price_ele");
    CreatBtn.setAttribute("class","addbtn_ele");
    CreatPriceElm.appendChild(CreatPriceText);
    CreatTitle.setAttribute("class" , "productTitile");
    CreatBtn.appendChild(btnText);

    productMainDiv.appendChild(CreatImgElm);
    productMainDiv.appendChild(CreatTitle);
    productMainDiv.appendChild(CreatPriceElm);
    productMainDiv.appendChild(CreatBtn);
    product.appendChild(productMainDiv);


    function addToCart(image , price){
      arrr.push({ii : image, pp : price});
      Dynamic_count.innerHTML++;
      let cartdiv = document.createElement("div");
      
        let cartTrashBtn= document.createElement("i");
        cartTrashBtn.setAttribute("class", "fa-solid fa-trash");
        cartdiv.setAttribute("class" , "cart-styling")
        let cartImgEle = document.createElement("img");
        cartImgEle.setAttribute("src" , ele.image);
        cartImgEle.setAttribute("class" , "cartimgelm2");
        let Pankajdhindsa = document.createTextNode(Image);
        cartImgEle.appendChild(Pankajdhindsa);


        let cartPriceEle = document.createElement("p");
        cartPriceEle.setAttribute("class", "cartPrice");
        let createpriceTaxt = document.createTextNode(`Pric : $${price}`);
        cartPriceEle.appendChild(createpriceTaxt);
        Dynamic_count.innerHTML = arrr.length;

        function deleteItems(){
          cartdiv.remove();
          calculteTotal.pop(price);
          Dynamic_count.innerHTML--;
        };

        cartTrashBtn.addEventListener("click" ,deleteItems)
        cartdiv.appendChild(cartImgEle); 
        cartdiv.appendChild(cartPriceEle);
       cartdiv.appendChild(cartTrashBtn);
        cratData.appendChild( cartdiv);

        

        calculteTotal.push(price);
        let mytotal = calculteTotal.reduce((accum , curVal) =>{
          return accum + curVal;
         
        })
        total.innerHTML = `Total = $${mytotal}`
        console.log(mytotal)

    }

    CreatBtn.addEventListener("click" ,() =>  addToCart(ele.image , ele.price));

    function add_to_cratData(image ,name, price){

      
    }
  });
}
GetData();
