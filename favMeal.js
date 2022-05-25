//getting the list of meals from local storage
let mealIdsval = JSON.parse(localStorage.getItem("mealid"));

//in this array we are inserting data of each meal which is added to favourite
let newMealsArray = [];
let Mealdetils = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let chckdata = [];

//getting the data of each meals which are added to favlist
function displayfavValue() {
  let promise = new Promise((resolve, reject) => {
    for (i in mealIdsval) {
      let mid = "";
      mid = mealIdsval[i];
      let newurl = Mealdetils + mid.mealIds;

      fetch(newurl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //            console.log(data)
          displayfavbookmarks(data);
          //     chckdata.push(data)
          //    return chckdata;
        });

      resolve("data is being resolved");
    }
  });
  return promise;
}
displayfavValue()
  .then((seccess) => {
    console.log(seccess);
  })
  .catch(() => {
    console.log("failed");
  });

//displaying the meals which are added in the fav list
function displayfavbookmarks(data) {
  newMealsArray.push(data);
  if (mealIdsval.length == newMealsArray.length) {
    displaytheDatas(newMealsArray);
  }
}

//creating html elements for each Meals added in the fav list
function displaytheDatas(newMealsArray) {
  let displayImahes = "";
  for (let i in newMealsArray) {
    let newData = newMealsArray[i].meals[0];

    displayImahes += `
        <div id="mealbox_${newData.idMeal}" class="newMain">
            <div  class="image_and_Details">
                <div class="imageDem">
                    <img src="${newData.strMealThumb}">
                </div>
                <div style="text-align: center;">
                    <p style=" color:white">${newData.strMeal}</p>
                    <div>
                        <button class="RemoveButton" onClick = "removeClickd(${newData.idMeal},'mealbox_${newData.idMeal}')" >
                         Remove
                         </button>
                    </div>
                </div>
            </div>
        </div>
        `;
  }

  document.querySelector(".main_ImageANdDet_Sec").innerHTML = displayImahes;
}
//in this function getting the id of div and the id of the recipe as an argument and handling remove functionality
function removeClickd(val, newMain) {
  let removableeme = document.getElementById(newMain);

  let Idmeals = "";
  for (let i in newMealsArray) {
    Idmeals = newMealsArray[i].meals[0].idMeal;

    if (Idmeals == val) {
      console.log(Idmeals);

      handleDeleteAction(Idmeals);
      removableeme.remove();
      return;
    }
  }
}

//handling the removing functionality of meals from favlist
function handleDeleteAction(Idmeals) {
  //getiing the list of meals which were in the fav list from localstorage
  let temp = JSON.parse(localStorage.getItem("mealid"));
  for (let i of temp) {
    console.log(i);
    if (i.mealIds == Idmeals) {
      //removing the id of that meal which we want to remove from localstorage
      temp.splice(i, 1);
      //inserting back the updating list of fav meals in  the localstorage
      localStorage.setItem("mealid", JSON.stringify(temp));
    }
  }
}
