//Getting the id of the meal from local storage as we have set that value to the local storage
let mealIds = localStorage.getItem("resValue");
//url for getting the meals data from api using Id of the meals
let MealAPiByID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

//rendering the moredetail section
function displayTheDetailSec(responseJSON) {
  let displayImageAndDetails = "";
  for (let i in responseJSON.meals) {
    //console.log(responseJSON.meals[i])

    displayImageAndDetails += `
	<div class="Image_And_Detail">
			<h1 class="meal_Name">${responseJSON.meals[i].strMeal}</h1>
            <div class="imgAndDesc">
				<div class="imageDem1">
					<img src = "${responseJSON.meals[i].strMealThumb}">
				</div>
				<div class="description">
					<p>${responseJSON.meals[i].strInstructions}</p>
					<a href = "${responseJSON.meals[i].strYoutube}">click for youtube</a>
				</div>
			<div>
      <div class="recipe__ingredients">
      <h2 class="heading--2">Meal ingredients</h2>
      <ul class="recipe__ingredient-list">
        <li class="recipe__ingredient">
          <div class="recipe__description">
          ${responseJSON.meals[i].strIngredient1}
           
          </div>
        </li>
 <li class="recipe__ingredient">
         
          <div class="recipe__description">
          ${responseJSON.meals[i].strIngredient2}
           
          </div>
        </li>
        <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient3}
         
        </div>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient4}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient5}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient6}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient7}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient8}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient9}
         
        </div>
      </li>
      </li>
      <li class="recipe__ingredient">
         
        <div class="recipe__description">
        ${responseJSON.meals[i].strIngredient10}
         
        </div>
      </li>
      </ul>
    </div>
    
     </div>
    
	
	`;
  }
  //inserting the more detail section in to the dom
  document.querySelector(".main_details_Page_Section").innerHTML =
    displayImageAndDetails;
}

//fetching the meal data from Api using Async function by id
const callingMealDetailById = async function () {
  try {
    const res = await fetch(`${MealAPiByID}${mealIds}`);
    const data = await res.json();
    //sending the meal data for rendering in to the dom for getting more deatil
    displayTheDetailSec(data);

    //throwing error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //handling the error
  } catch (err) {
    console.log("Request Failed @ without Jquery method" + err);
  }
};
callingMealDetailById();
