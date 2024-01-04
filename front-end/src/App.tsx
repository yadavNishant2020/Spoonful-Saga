import { FormEvent, useState, useRef } from "react";
import "./App.css"
import * as api from './api'
import { Recipe } from "./types";
import { RecipeCard } from "./components/ReceipeCard";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);

  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {

      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;

    } catch (error) {

      console.error("Failed fetching api.", error);

    }
  }

  const handleViewMore = async () => {
    const nextPageNum = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPageNum)
      setRecipes([...recipes, ...nextRecipes.results])
      pageNumber.current = nextPageNum;
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <form action="" onSubmit={(event) => handleSearchSubmit(event)}>
      <input
        type="text"
        required placeholder="Enter a search term...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button >Submit</button>

    </form>
    {recipes.map((recipe) => (
      <RecipeCard recipe={recipe} onclick={() => setSelectedRecipe(recipe)} />
    ))}
    <button onClick={handleViewMore}>View More Recipes</button>

    {selectedRecipe? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)}  /> : null}
  </div>
}

export default App;