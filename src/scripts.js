//NOTE: Data model and non-dom manipulating logic will live in this file.
import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import ingredientsData from "./data/ingredients.js";
// import { recipeTestData } from "./data/testData";
import recipeData from "./data/recipes.js";

//Example of one way to import functions from the domUpdates file. You will delete these examples.
import { createRecipeCards } from "./domUpdates.js";

console.log(ingredientsData);

window.addEventListener("load", function () {
  createRecipeCards(recipeData);
});

import { filterByTag } from "../src/recipes.js";
