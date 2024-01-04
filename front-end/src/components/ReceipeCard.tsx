import { Recipe } from "../types"

interface Props {
    recipe: Recipe;
    onclick: () => void
}
export const RecipeCard = ({ recipe , onclick}: Props) => {

    return (
        <div className="recipe-card" onClick={onclick}>
            <img src={recipe.image} alt="" />
            <div>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}