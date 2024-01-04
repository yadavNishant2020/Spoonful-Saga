import { FormEvent, useState, useRef } from "react";
import "./App.css"
import * as api from './api'
import { Recipe } from "./types";
import { RecipeCard } from "./components/ReceipeCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([])
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

  const handleViewMore = async() =>{
    const nextPageNum = pageNumber.current+1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPageNum )
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
     <RecipeCard recipe={recipe}/>
    ))}
    <button onClick={handleViewMore}>View More Recipes</button>
  </div>
}

export default App;