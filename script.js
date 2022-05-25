//url for searching the meal using alphabet
let MealApiByAlphabet = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

//url for searching the meal using name of the meal
let MealApiByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

//selecting the search input box from the dom
let suggestionBut = document.getElementById("search_input_Id");

let bodyTag = document.querySelector(".main_body");

//Array for storing the list of meals in the favourite list
let arrval = [];

//selecting the div on which image of the recipe will be inserted
let main_ImageANdDet_Sec = document.querySelector(".main_ImageANdDet_Sec");
//selecting the div on which the number of element in the fav item is shown
let circleTah = document.getElementById("circleNum");
let numoffvlis = 0;
// setting

//using getDetails function extracting the mealid of the meal and through that id we will search for meal from Api
function getDetails(IdValue) {
  let mealIds = document.getElementById(IdValue);
  let mIds = mealIds.getAttribute("value");
  getMealDetailsById(mIds);
}

//creating the html element div for each searched result of the meal and then inserting it in to the dom
function showImages(resJson) {
  let newDivss = document.querySelector(".newMain");
  console.log(newDivss);
  let inc = 0;
  let newMain;
  if (newDivss != null) {
    document.querySelector(".newMain").remove();
  }
  newMain = document.createElement("DIV");
  newMain.classList.add("newMain");
  main_ImageANdDet_Sec.appendChild(newMain);
  let newImageDetSec;
  let ImgDem;
  let newImgTag;
  let textCont = "";
  if (resJson.meals == "null") {
    return;
  } else {
    for (i in resJson.meals) {
      let moreDet;
      inc = inc + 1;
      textCont = "";
      newImageDetSec = document.createElement("DIV");
      newImageDetSec.classList.add("image_and_Details");
      newMain.appendChild(newImageDetSec);
      ImgDem = document.createElement("DIV");
      ImgDem.classList.add("imageDem");
      newImageDetSec.appendChild(ImgDem);
      newImgTag = document.createElement("img");
      newImgTag.setAttribute("src", resJson.meals[i].strMealThumb);
      ImgDem.appendChild(newImgTag);
      textCont = resJson.meals[i].strInstructions.slice(0, 95);
      let newParaInst = document.createElement("p");
      newParaInst.classList.add("InstClass");
      newParaInst.textContent = textCont + "...";
      newImageDetSec.appendChild(newParaInst);
      let favButton = document.createElement("BUTTON");
      favButton.textContent = "Add to Favourite";
      favButton.style.backgroundColor = "red";
      favButton.classList.add("favbutton1");
      newImageDetSec.appendChild(favButton);
      let favIdButtvalue = "";
      //getting the id of the current meal using it for my favourite section
      favIdButtvalue = resJson.meals[i].idMeal;
      favButton.setAttribute("value", favIdButtvalue);
      moreDet = document.createElement("BUTTON");
      moreDet.textContent = "get more details";
      moreDet.classList.add("detbutton");
      let idsval = "";
      idsval = "butt" + inc;
      moreDet.setAttribute("id", idsval);
      moreDet.setAttribute("value", resJson.meals[i].idMeal);
      newImageDetSec.appendChild(moreDet);
      moreDet.addEventListener("click", function () {
        //handling event for more detail and passing the id of that button to the getDetails function
        getDetails(idsval);
        //
      });
      favButton.addEventListener("click", function () {
        //handling the event when add to favourite button is clicked
        setBookmarks(favIdButtvalue);
        abc();
      });
    }
  }
}
//fetching the meal data from Api using Async function
const fetchMealApiRequest = async function (e) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`
    );
    const data = await res.json();
    //sending the meal data for rendering in to the dom
    showImages(data);
    //throwing error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //handling the error
  } catch (err) {
    console.log(err);
  }
};

//function to redirect the page to the mealdetails page
function getMealDetailsById(mealIds) {
  //changing the current url location of the browser
  window.location.href = "mealsDetails.html";
  localStorage.setItem("resValue", mealIds);
}

//function for adding the meal in to favlist when clicked on add to favourite

function setBookmarks(favIdButtvalue) {
  //handling the case when the meals is already present in the favourite list
  const index = arrval.findIndex((el) => el.mealIds === favIdButtvalue);
  if (index !== -1) {
    console.log("already exist");
    return;
  }
  let newObs = {};
  newObs.mealIds = favIdButtvalue;
  //pushing the newly cretaed object in to arrvl array
  arrval.push(newObs);
  //inserting the arrval in to the localstorage
  localStorage.setItem("mealid", JSON.stringify(arrval));
}

//updating the number of meal in favourite
function abc() {
  let listOfextistingFav = JSON.parse(localStorage.getItem("mealid"));
  circleTah.classList.add("circlefornum");

  if (listOfextistingFav != null) {
    circleTah.textContent = listOfextistingFav.length;
  } else {
    circleTah.textContent = "0";
  }
}
abc();

let kp = "";

let newkp = "";
//getting the entered value by the user in the search input box and then pass that value fetchMealApiRequest to get the meal from Api
suggestionBut.addEventListener("keydown", function (e) {
  console.log(e);
  let ip1 = document.getElementById("search_input_Id").value;

  console.log(ip1);
  if ((e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) {
    fetchMealApiRequest(ip1);
  }
});
