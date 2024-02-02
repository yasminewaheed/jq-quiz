let loading = document.querySelector(".loading");
let body = document.querySelector("body");

// console.log(loading);
$("#openTap").click(() => {
  slideupNav();
  $("#closeTap").removeClass("d-none");
  $("#openTap").addClass("d-none");
  $("nav").animate({ left: `0px` });
});
$("#closeTap").click(() => {
  slideDown();
  let tabs = Array.from($("nav ul li"));
  tabs.forEach((item) => {
    item.animate({ top: "300px" });
  });
  let leftWidth = $("nav .nav-link").width();
  $("#openTap").removeClass("d-none");
  $("#closeTap").addClass("d-none");
  $("nav").animate({ left: `${leftWidth}` });
});

$(".close").on("click", function () {
  $(".nav-link").animate({ width: "0", padingInline: "toggle" }, 1000);
  $(".close").addClass("d-none");
  $(".open").removeClass("d-none");
  $("#nav ul li").animate(
    {
      top: 60,
    },
    1000
  );
});
$(".open").on("click", function () {
  $(".nav-link").animate({ width: "300", padingInline: "toggle" }, 1000);
  $(".open").addClass("d-none");
  $("#nav ul li").animate(
    {
      top: -40,
    },
    1000
  );
  console.log($("#nav ul li"));

  $(".close").removeClass("d-none");
});

document.querySelectorAll("ul li").forEach(function (link) {
  link.addEventListener("click", function () {
    let categ = link.getAttribute("data-categ");
    if (categ == " Search") {
      $("#content").html(`
<div class="container">
<div class="row gy-3 p-4">
<div class="col-lg-6">
  <input
  style="background-color: transparent; color: #fffefe;"
    type="search"
    class="form-control"
    placeholder="Search By Name ..."
    id="input1"
    oninput="getSearch()"
  />
</div>

<div class="col-lg-6">
  <input
  style="background-color: transparent;"
    type="search"
    class="form-control"
    placeholder="Search By One Letter ..."
    id="input2"
    oninput="getSearch2()"
    maxlength="1"
  />
</div>
</div>    
</div>
<div class="content-area pt-5" id="contentArea">
    
</div>
    
      `);
    } else if (categ == "Categories") {
      console.log("categ");
      getCategory();
      document.getElementById("search").classList.add("d-none");
    } else if (categ == "Area") {
      document.getElementById("search").classList.add("d-none");
      area();
      console.log("Area");
    } else if (categ == "Ingredients") {
      document.getElementById("search").classList.add("d-none");
      ingredit();
      console.log("ingradition");
    } else {
      document.getElementById("search").classList.add("d-none");
      $("#content").html(`
    <div class="container">
    <h1 class="text-center py-5 text-white">Contact us</h1>
  
    <form autocomplete="off" oninput="check()">
    
 <div class="row  gy-3 ">
 
 <div class="col-lg-6 position-relative">
 <input
 id= inputname
 oninput="validitionName()"
 type="text"
 class="form-control text-center"
 placeholder="Enter Your Name ..."/>
 
 <p id="error" class="alert alert-danger d-none">
 Special Characters and Numbers not allowed
 </p>
 </div>
 
 <div class="col-lg-6 position-relative">
 <input
 oninput="validitionemail()"
 id="inputemail"
 type="email"
 class="form-control text-center"
 placeholder="Enter your E-mail..."/>
 
 <p id="error2" class="alert alert-danger d-none">
 Enter valid email. *Ex: xxx@yyy.zzz
 
 </p>
 
 </div>
 
 
 <div class="col-lg-6 position-relative">
   <input
   id="inputtel"
   type="tel"
   oninput="validitionphone()"
   class="form-control text-center"
   placeholder="Enter Phone..."/>

   <p id="error3" class="alert alert-danger d-none">
   Enter valid Phone Number
 </p>
   </div>
 
 
 
   <div class="col-lg-6 position-relative">
     <input
     oninput="validitionage()"
     id="inputage"
     type="number"
     class="form-control text-center"
     placeholder="Enter Age ..."/>
 
     <p id="error4" class="alert alert-danger  d-none">
     Enter valid Age
 
   </p>
 
     </div>
 
 
 
     <div class="col-lg-6 position-relative">
       <input
       oninput="validitionpass()"
       id="inputpass"
       type="password"
       class="form-control text-center"
       placeholder="Enter Passward..."/>
 
       <p id="error5" class="alert alert-danger d-none">
       Enter valid password *Minimum eight characters, at least one letter and one number:*
 
   
     </p>
       </div>
 
 
 
       <div class="col-lg-6 position-relative">
         <input
         oninput="validitionpass2()"
         id="inputpass2"
         type="password"
         class="form-control text-center"
         placeholder="Enter Repassward ..."/>
 
         <p id="error6" class="alert alert-danger d-none">
         Enter valid Repassword
   
     
       </p>
         </div>
 
 
 <div class="d-flex justify-content-center">
 <button id="btn" type="submit" class=" btn btn-outline-danger mx-auto my-4 " disabled>submit</button>
 </div>
 </div>
    </form>
    </div>
  
  
     
     `);
    }
  });
});

async function getCategory() {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let apiData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let result = (await apiData.json()).categories;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
 
<div class="container p-3">
<div class="col">
<div class="item cp text-dark " onclick="filiter('${result[i].strCategory}')" >
    <div class="image position-relative">
<div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${
      result[i].strCategoryThumb
    }"></div>

<div class="layer position-absolute top-100 end-0 bottom-0 start-0 bg-white opacity-75  py-2 px-2>



<h3 class="align-self-center">${result[i].strCategory}</h3>



<p class=" small ">${result[i].strCategoryDescription.split(" ", 15)}</p>

        </div>
    </div>
</div>
</div>

</div>
    `;
  }

  $("#content").html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 text-center mt-5"
  
 >
 ${cartona}
 </div> 
 
  `);
}
async function area() {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list
       `
  );
  let result = (await data.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
   
      
   
       <div class="col">
     <div class="item cp  rounded p-4 "  onclick="filiterArea('${result[i].strArea}')">
         <div class="image position-relative text-center">
         <i class="fa-solid fa-house-laptop text-white fa-4x"></i>
     
     <div >
     <p class="text-white fw-semibold fs-5 ">${result[i].strArea}</p>
     
             </div>
         </div>
     </div>
     </div>
       `;
  }

  $("#content").html(`
   <div
   class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
   
  >
  ${cartona}
  </div> 
  
   `);
}
async function ingredit() {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list
        `
  );
  let result = (await data.json()).meals.slice(0, 20);
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
    
       
    
        <div class="col">
      <div class="item h-100 cp rounded p-4  bg-opacity-25"  onclick="filiterintag('${
        result[i].strIngredient
      }')" >
          <div class="image position-relative text-center">
      <i class="fa-solid fa-drumstick-bite text-white fa-4x"></i>
      
      <div >
       <h3 class="text-white">${result[i].strIngredient}</h3>
     <p class="text-white small">${result[i].strDescription
       .split(" ", 15)
       .join(" ")}</p>
      
              </div>
          </div>
      </div>
      </div>
        `;
  }

  $("#content").html(`
    <div
    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
    
   >
   ${cartona}
   </div> 
   
    `);
}

async function Display() {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=
          `
  );
  let result = (await data.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
      
         
    <div class="col">
      <div class="item cp"    onclick="getDetails(${result[i].idMeal})">
          <div class="image position-relative">
          <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${result[i].strMealThumb}"/></div>
    
      <div class="layer position-absolute top-100 end-0 bottom-0 start-0  bg-white opacity-75 ">
      <p class="text-dark fw-semibold fs-5 ">${result[i].strMeal}</p>
    
              </div>
          </div>
      </div>
      </div>
          `;
  }

  $("#content").html(`
      <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center  pt-4"
      
     >
     ${cartona}
     </div> 
     
      `);
}
Display();

// filter categoray
async function filiter(lett) {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${lett}`
  );
  let result = (await api.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  Displaydetiles(result);
}
function Displaydetiles(api) {
  let carton = "";
  for (let i = 0; i < api.length; i++) {
    carton += `


    <div class="col">
  <div class="item  " onclick="getDetails(${api[i].idMeal})">
      <div class="image position-relative">
      <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${api[i].strMealThumb}"></div>
 
  
  <div class="layer position-absolute top-100 end-0 bottom-0 start-0  bg-white   py-2 px-2 ">
  <p class="text-dark fw-semibold fs-5 ">${api[i].strMeal}</p>
  
          </div>
      </div>
  </div>
  </div>
    `;
  }
  $(`#content`).html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
  
>
${carton}
</div> 
 
  `);
}
// fillter Area
async function filiterArea(lett) {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${lett}`
  );
  let result = (await api.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);

  Displaydetiles(result);
}
function Displaydetiles(api) {
  let carton = "";
  for (let i = 0; i < api.length; i++) {
    carton += `
  
  
      <div class="col">
    <div class="item cp " onclick="getDetails(${api[i].idMeal})">
        <div class="image position-relative">
        <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${api[i].strMealThumb}"></div>
   
    
    <div class="layer position-absolute top-100 end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
    <p class="text-dark fw-semibold fs-5 ">${api[i].strMeal}</p>
    
            </div>
        </div>
    </div>
    </div>
      `;
  }
  $(`#content`).html(`
    <div
    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
    
  >
  ${carton}
  </div> 
   
    `);
}
//filter intgratio
async function filiterintag(lett) {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${lett}`
  );
  let result = (await api.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  Displaydetiles(result);
}
function Displaydetiles(api) {
  let carton = "";
  for (let i = 0; i < api.length; i++) {
    carton += `
    
    
        <div class="col p-2">
      <div class="item cp " onclick="getDetails(${api[i].idMeal})">
          <div class="image position-relative">
          <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${api[i].strMealThumb}"></div>
     
      
      <div class="layer position-absolute top-100 end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
      <p class="text-dark fw-semibold fs-5 ">${api[i].strMeal}</p>
      
              </div>
          </div>
      </div>
      </div>
        `;
  }
  $(`#content`).html(`
      <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
      
    >
    ${carton}
    </div> 
     
      `);
}

///Details

async function getDetails(id) {
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  const apiDetails = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const resultDetails = (await apiDetails.json()).meals[0];
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 500);
  document.getElementById("search").classList.add("d-none");
  $(`#content`).html(`
  
   <div class="row g-4 text-white p-lg-5 details">
   <div class="col-md-4">
     <div class="image">
       <img loading="lazy"
         class="w-100 rounded-3"
         src="${resultDetails.strMealThumb}"
         alt=""
       />
       <h3 class="h5 text-center mt-3 lead fw-bold">
         ${resultDetails.strMeal}
       </h3>
     </div>
   </div>
   <div class="col-md-8">
     <h3 class="lh">Instructions</h3>
     <p class="pt-3">
      ${resultDetails.strInstructions}
     </p>
     <h4>Area : <span class="fw-light">${resultDetails.strArea}</span></h4>
     <h4>Category : <span class="fw-light">${
       resultDetails.strCategory
     }</span></h4>
     <h4 class="recipes-title">Recipes :</h4>
   <ul class="list-unstyled d-flex g-3 flex-wrap">
     <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
       resultDetails.strMeasure1 + resultDetails.strIngredient1
     }</li>
     <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
       resultDetails.strMeasure2 + resultDetails.strIngredient2
     }</li>
     <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
       resultDetails.strMeasure3 + resultDetails.strIngredient3
     }</li>
     <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
       resultDetails.strMeasure4 + resultDetails.strIngredient4
     }</li>
     <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
       resultDetails.strMeasure5 + resultDetails.strIngredient5
     }</li>
     
 <li class="bg-success rounded-2 p-1 m-2 fw-light fs-6 fw-bold">${
   resultDetails.strMeasure6 + resultDetails.strIngredient6
 }</li>
   
 </ul>
     <h4  class="tags-title">Tags :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="tags">
     <li class="badge bg-danger bg-opacity-50 p-2 fw-light fs-6">
         ${resultDetails.strTags}
        </li>
     </ul>


   <div class="hstack mt-4 gap-2">
     <a href="${
       resultDetails.strSource
     }" target="_blank" class="btn btn-success">Source</a>
     <a href="${
       resultDetails.strYoutube
     }" target="_blank" class="btn btn-danger">Youtube</a>
     
   </div>

   </div>
 </div>

   `);
}

//search by char
async function getSearch() {
  let letter = document.getElementById("input1").value;
  loading.classList.remove("d-none");
  body.classList.add("overflow-hidden");
  const ApiResult = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
  );

  const listData = (await ApiResult.json()).meals;
  setTimeout(() => {
    loading.classList.add("d-none");
    body.classList.remove("overflow-hidden");
  }, 100);
  document.getElementById("search").classList.remove("d-none");
  Displaydetilessearch(listData);
}
async function getSearch2() {
  maxlenth = 1;
  let letter = document.getElementById("input2").value;
  let length = document.getElementById("input2").value.length;
  document.getElementById("search").classList.remove("d-none");
  if (length == maxlenth) {
    loading.classList.remove("d-none");
    body.classList.add("overflow-hidden");
    const ApiResult = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
    );

    const listData = (await ApiResult.json()).meals;
    setTimeout(() => {
      loading.classList.add("d-none");
      body.classList.remove("overflow-hidden");
    }, 100);
    Displaydetilessearch(listData);
    letter = letter.slice(0, -1);
  }
}

function validitionName() {
  var text = document.getElementById("inputname").value;
  var regex = /^[a-zA-Z ]+$/;
  if (regex.test(text) == true) {
    document.getElementById("inputname").classList.remove("is-invalid");
    document.getElementById("inputname").classList.add("is-valid");
    document.getElementById("error").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputname").classList.add("is-invalid");
    document.getElementById("inputname").classList.remove("is-valid");
    document.getElementById("error").classList.remove("d-none");

    return false;
  }
}
function validitionemail() {
  var text = document.getElementById("inputemail").value;
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(text) == true) {
    document.getElementById("inputemail").classList.remove("is-invalid");
    document.getElementById("inputemail").classList.add("is-valid");
    document.getElementById("error2").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputemail").classList.add("is-invalid");
    document.getElementById("inputemail").classList.remove("is-valid");
    document.getElementById("error2").classList.remove("d-none");

    return false;
  }
}
function validitionphone() {
  var text = document.getElementById("inputtel").value;
  var regex = /^01[0125][0-9]{8}$/;
  if (regex.test(text) == true) {
    document.getElementById("inputtel").classList.remove("is-invalid");
    document.getElementById("inputtel").classList.add("is-valid");
    document.getElementById("error3").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputtel").classList.add("is-invalid");
    document.getElementById("inputtel").classList.remove("is-valid");
    document.getElementById("error3").classList.remove("d-none");

    return false;
  }
}
function validitionage() {
  var text = document.getElementById("inputage").value;
  var regex = /^([1-9]|[1-9][0-9]|100)$/;
  if (regex.test(text) == true) {
    document.getElementById("inputage").classList.remove("is-invalid");
    document.getElementById("inputage").classList.add("is-valid");
    document.getElementById("error4").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputage").classList.add("is-invalid");
    document.getElementById("inputage").classList.remove("is-valid");
    document.getElementById("error4").classList.remove("d-none");

    return false;
  }
}
function validitionpass() {
  var text = document.getElementById("inputpass").value;
  var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if (regex.test(text) == true) {
    document.getElementById("inputpass").classList.remove("is-invalid");
    document.getElementById("inputpass").classList.add("is-valid");
    document.getElementById("error5").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputpass").classList.add("is-invalid");
    document.getElementById("inputpass").classList.remove("is-valid");
    document.getElementById("error5").classList.remove("d-none");

    return false;
  }
}
function validitionpass2() {
  var text = document.getElementById("inputpass2").value;
  var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if (
    regex.test(text) == true &&
    document.getElementById("inputpass2").value ==
      document.getElementById("inputpass").value
  ) {
    document.getElementById("inputpass2").classList.remove("is-invalid");
    document.getElementById("inputpass2").classList.add("is-valid");
    document.getElementById("error6").classList.add("d-none");
    return true;
  } else {
    document.getElementById("inputpass2").classList.add("is-invalid");
    document.getElementById("inputpass2").classList.remove("is-valid");
    document.getElementById("error6").classList.remove("d-none");

    return false;
  }
}
$("form").on("input", function () {
  if (
    validitionName() == true &&
    validitionemail() == true &&
    validitionpass() == true &&
    validitionpass2() == true &&
    validitionage() == true &&
    validitionphone() == true
  ) {
    $("button").removeAttr("disabled");
  } else {
    $("button").attr("disabled", true);
  }
});

function check() {
  if (
    validitionName() == true &&
    validitionemail() == true &&
    validitionphone() == true &&
    validitionage() == true &&
    validitionpass() == true &&
    validitionpass2() == true
  ) {
    document.getElementById("btn").removeAttribute("disabled");
  }
}

function Displaydetilessearch(api) {
  let carton = "";
  for (let i = 0; i < api.length; i++) {
    carton += `
  
  
      <div class="col">
    <div class="item cp " onclick="getDetails(${api[i].idMeal})">
        <div class="image position-relative">
        <div class="ratio ratio-4x3"> <img loading="lazy" class="w-100" src="${api[i].strMealThumb}"></div>
   
    
    <div class="layer position-absolute top-100 end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">
    <p class="text-dark fw-semibold fs-5 ">${api[i].strMeal}</p>
    
            </div>
        </div>
    </div>
    </div>
      `;
  }
  $(`#search`).html(`
    <div
    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
    
  >
  ${carton}
  </div> 
   
    `);
}
