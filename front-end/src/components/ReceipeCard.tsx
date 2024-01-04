import { Recipe } from "../types"

interface Props {
    recipe: Recipe
}
export const RecipeCard = ({ recipe }: Props) => {

    return (
        <div >
            <img src={recipe.image} alt="" />
            <div>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}