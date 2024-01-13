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
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center mt-32 mx-5">
                <div className="overlay fixed inset-0 bg-black bg-opacity-80"></div>
    
                <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                    <div className="modal-content">
                        <div className="modal-header flex justify-between items-center mb-4">
                            <b><h2 className="text-2xl font-bold text-gray-800">{recipeSummary.title}</h2></b>
                            <span className="close-btn cursor-pointer text-gray-500 text-3xl" onClick={onClose}>&times;</span>
                        </div>

                    </div>
                        <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></span>

                </div>
            </div>
        </div>
    </>

    )
}

export default RecipeModal;