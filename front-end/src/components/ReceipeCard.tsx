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
        <div className="recipe-card cursor-pointer border w-[300px]  p-4 mb-8 bg-white bg-opacity-75 shadow-md transition-transform transform hover:scale-105 flex flex-col items-center" onClick={onclick}>
        <img className="mb-2 rounded-sm border-black" width={350} height={350} src={recipe.image} alt={recipe.title} />
  
        <div className="flex items-center justify-around">
          <span
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              onFavBtnClick(recipe);
            }}
          >
            {isFav ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
          </span>
  
          <h3 className="pl-2 text-sm tracking-wide text-center">{recipe.title}</h3>
        </div>
      </div>
    )
}