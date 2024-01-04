import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import * as RecipeAPI from '../api';

interface Props {
    recipeId: string
    onClose: () => void
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
                setRecipeSummary(summaryRecipe);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecipeSummary();
    }, [recipeId])
    if (!recipeSummary) {
        return <></>;
    }
    return (
        <>
            <div className="overlay">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <b><h2>{recipeSummary.title}</h2></b>
                            <span className="close-btn" onClick={onClose}>&times;</span>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeModal;