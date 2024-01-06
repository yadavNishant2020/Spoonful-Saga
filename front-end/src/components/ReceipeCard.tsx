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
        <div className="recipe-card" onClick={onclick}>
            <img src={recipe.image} alt="" />
            <div>
                <span onClick={(event) => {
                    event.stopPropagation()
                    onFavBtnClick(recipe)
                }}>
                    {isFav ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}