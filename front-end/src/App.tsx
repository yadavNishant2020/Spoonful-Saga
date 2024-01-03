import { FormEvent, useState } from "react";
import "./App.css"
import * as api from './api'
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("pasta");
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {

      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);

    } catch (error) {
      console.error("Failed fetching api.", error);

    }
  }

  return <div>
    <form action="" onSubmit={(event) => handleSearchSubmit(event)}>
    <button >Submit</button>

    </form>
    {recipes.map((recipe) => (
      <div>
        recipe image location : {recipe.image}
        recipe title: {recipe.title}
      </div>
    ))}
  </div>
}

export default App;