import { Recipe } from "./types";

export const searchRecipes = async (searchTerm: string, page: number) => {

   const baseUrl = new URL("https://wandering-impulse-production.up.railway.app/api/recipes/search");

   baseUrl.searchParams.append("searchTerm", searchTerm)
   baseUrl.searchParams.append("page", String(page));

   const response = await fetch(baseUrl);
   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
   }

   return response.json();

};

export const getRecipeSummary = async (recipeId: string) => {
   const url = new URL(`https://wandering-impulse-production.up.railway.app/api/recipes/${recipeId}/summary`);
   const response = await fetch(url);

   if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
   }

   return response.json();
};

export const getFavouriteRecipes = async () => {
   const url = new URL("https://wandering-impulse-production.up.railway.app/api/recipes/favourite");
   const response = await fetch(url);

   if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
   }

   return response.json();
}

export const addFavRecipe = async (recipe: Recipe) => {
   const url = new URL("https://wandering-impulse-production.up.railway.app/api/recipes/favourite");
   const body = {
      recipeId: recipe.id
   }
   const response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
   })

   if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
   }

}

export const removeFavRecipe = async (recipe: Recipe) =>{

   const url = new URL("https://wandering-impulse-production.up.railway.app/api/recipes/favourite");
   const body = {
      recipeId: recipe.id
   }
   const response = await fetch(url, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
   })

   if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
   }

}