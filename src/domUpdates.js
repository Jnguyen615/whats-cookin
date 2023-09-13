const recipeArea = document.querySelector(".recipe-area");
const recipeTitle = document.querySelector("#recipeCardTitle");
const recipeTagArea = document.querySelector("#recipeCardTags");
const recipeIngredientsArea = document.querySelector("#recipeCardIngredients");
const recipeCost = document.querySelector("#recipeCardTotalCost");
const recipeImageSection = document.querySelector("#recipeImageSection");
const recipeCard = document.querySelector("#recipeCardBlowup");
const recipeInstructionsSection = document.querySelector(
  "#recipeCardInstructions"
);
const tagSection = document.querySelector(".tag-area");
const recipeCardBookmarkAdd = document.querySelector(".icon-bookmark");
const recipeCardBookmarkDelete = document.querySelector(".solid-bookmark");

const createRecipeCards = (recipes) => {
  recipeArea.innerHTML = "";
  recipes.forEach((recipe) => {
    let recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.setAttribute("id", recipe.id);
    let recipeTitle = document.createElement("h2");
    recipeTitle.classList.add("recipe-title");
    recipeCard.appendChild(recipeTitle);
    recipeTitle.innerText = recipe.name;
    let recipeImage = document.createElement("img");
    recipeImage.classList.add("recipe-image");
    recipeImage.setAttribute("src", recipe.image);
    recipeCard.appendChild(recipeImage);
    recipeArea.appendChild(recipeCard);
  });
};

const locateRecipe = (recipeId, recipes) => {
  let formatRecipeId = Number(recipeId);
  let foundRecipe = recipes.find((recipe) => {
    return recipe.id === formatRecipeId;
  });
  return foundRecipe;
};

const buildRecipeTitle = (foundRecipe) => {
  recipeTitle.innerText = foundRecipe.name;
};

const buildRecipeImage = (foundRecipe) => {
  recipeImageSection.innerHTML = "";
  let recipeImage = document.createElement("img");
  recipeImage.classList.add("recipe-image-blowup");
  recipeImage.setAttribute("src", foundRecipe.image);
  recipeImageSection.appendChild(recipeImage);
};

const buildRecipeTags = (foundRecipe) => {
  recipeTagArea.innerHTML = "";
  foundRecipe.tags.forEach((tag) => {
    let recipeTag = document.createElement("div");
    recipeTag.classList.add("recipe-tag");
    let recipeTagText = document.createElement("p");
    recipeTagText.innerText = tag;
    recipeTag.appendChild(recipeTagText);
    recipeTagArea.appendChild(recipeTag);
  });
};

const buildRecipeCost = (foundRecipe, ingredients, cost) => {
  recipeCost.innerText = `The total cost is $${cost}`;
};

const buildIngredients = (foundRecipe, ingredients, recipeIngredients) => {
  recipeIngredientsArea.innerHTML = "";
  
  let ingredientAmounts = foundRecipe.ingredients.map((ingredient) => {
    return `${ingredient.quantity.amount} ${ingredient.quantity.unit} `;
  });

  for (let i = 0; i < recipeIngredients.length; i++) {
    let recipeIngredient = document.createElement("p");
    recipeIngredient.innerText = `${ingredientAmounts[i]} - ${recipeIngredients[i]}`;
    recipeIngredientsArea.appendChild(recipeIngredient);
  }
};

const buildInstructions = (foundRecipe) => {
  recipeInstructionsSection.innerHTML = "";
  foundRecipe.instructions.forEach((instruction) => {
    let recipeInstruction = document.createElement("p");
    recipeInstruction.innerText = `Step ${instruction.number}. ${instruction.instruction}`;
    recipeInstructionsSection.appendChild(recipeInstruction);
  });
};

const buildRecipeCard = (recipe, ingredients, recipeIngredients, cost) => {
  recipeCardBookmarkAdd.setAttribute("id", recipe.id);
  recipeCardBookmarkDelete.setAttribute("id", recipe.id);
  buildRecipeTitle(recipe);
  buildRecipeImage(recipe);
  buildRecipeTags(recipe);
  buildRecipeCost(recipe, ingredients, cost);
  buildIngredients(recipe, ingredients, recipeIngredients);
  buildInstructions(recipe);
};

const displayRecipeCard = () => {
  recipeArea.classList.toggle("hidden", true);
  recipeCard.classList.toggle("hidden", false);
  tagSection.classList.toggle("hidden", true);
};

const displayRecipeArea = () => {
  recipeArea.classList.toggle("hidden", false);
  recipeCard.classList.toggle("hidden", true);
  tagSection.classList.toggle("hidden", false);
};

const saveRecipe = (id, user) => {
  user.recipesToCook.push(id);
};

const deleteRecipe = (idClicked, user) => {
  let foundRecipeIndex = user.recipesToCook.findIndex((recipe) => {
    return recipe === idClicked;
  });
  user.recipesToCook.splice(foundRecipeIndex, 1);
};

const displayRecipeTag = (id, currentUser, recipes) => {
  let savedStatus = currentUser.recipesToCook.includes(id);
  if (savedStatus === true) {
    recipeCardBookmarkAdd.classList.toggle("hidden", true);
    recipeCardBookmarkDelete.classList.toggle("hidden", false);
  } else {
    recipeCardBookmarkAdd.classList.toggle("hidden", false);
    recipeCardBookmarkDelete.classList.toggle("hidden", true);
  }
};

const buildSearchFail = () => {
  let searchFail = document.createElement("p");
  searchFail.classList.add("error");
  searchFail.innerText = `There were no results for your search, please try another term.`;
  recipeArea.appendChild(searchFail);
};

export {
  createRecipeCards,
  locateRecipe,
  buildRecipeTitle,
  buildRecipeTags,
  buildRecipeCard,
  buildRecipeCost,
  displayRecipeCard,
  displayRecipeArea,
  saveRecipe,
  deleteRecipe,
  displayRecipeTag,
  buildSearchFail,
};
