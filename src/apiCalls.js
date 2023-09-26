const apiCalls = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Get network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching ${dataType}: ${error}`);
    });
};
const promises = [
  apiCalls("users"),
  apiCalls("ingredients"),
  apiCalls("recipes"),
];

const addRecipeToUser = (userId, recipeId) => {
  const root = `http://localhost:3001/api/v1/usersRecipes`;
  const recipeBody = { userID: userId, recipeID: recipeId };
  return fetch(root, {
    method: "POST",
    body: JSON.stringify(recipeBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((postResponse) => {
      if (!postResponse.ok) {
        throw new Error(
          `POST network response was not ok: ${postResponse.status}`
        );
      }
      return fetch(`http://localhost:3001/api/v1/users`);
    })
    .then((getUsersResponse) => {
      if (!getUsersResponse.ok) {
        throw new Error(
          `GET network response was not ok: ${getUsersResponse.status}`
        );
      }
      return getUsersResponse.json();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};



export default promises;
export const addRecipe = addRecipeToUser;
