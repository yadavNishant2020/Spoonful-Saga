import { Recipe } from "../types"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface Props {
    recipe: Recipe;
    onclick: () => void
    onFavBtnClick: (recipe: Recipe) => void
    isFav: boolean

}
export const RecipeCard = ({ recipe, onclick, onFavBtnClick, isFav }: Props) => {

    return (
        <div className="recipe-card cursor-pointer border p-4 mb-4 bg-white rounded-md shadow-md transition-transform transform hover:scale-105" onClick={onclick}>
        <img className="mb-2" src={recipe.image} alt={recipe.title} />
  
        <div className="flex items-center justify-between">
          <span
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              onFavBtnClick(recipe);
            }}
          >
            {isFav ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
          </span>
  
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
        </div>
      </div>
    )
}