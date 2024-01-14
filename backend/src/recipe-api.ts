require('dotenv').config();
const apiKey = process.env.API_KEY;
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// console.log(apiKey);


export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found.")
    }

    if (typeof searchTerm !== "string" || typeof page !== "number") {
        throw new Error("Invalid parameters.");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey: apiKey,
        query: searchTerm,
        number: "8",
        offset: (page * 8).toString()
    }

    url.search = new URLSearchParams(queryParams).toString() //Attach each value pairs to the url

    try {
        const searchRes = await fetch(url);
        const resultJSON = await searchRes.json();
        return resultJSON;
    } catch (error: any) {
        throw new Error(`Error fetching recipes: ${(error as Error).message}`);
    }
};

export const getRecipeSummary = async (recipeId: string) => {

    if (!apiKey) {
        throw new Error("API key not found.")
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)

    const queryParams = {
        apiKey: apiKey,
    }

    url.search = new URLSearchParams(queryParams).toString();

    const response = await fetch(url);
    const json = await response.json();

    return json;

};

export const getFavRecipedByIDs = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API key not found.")
    }

    const url = new URL("https://api.spoonacular.com/recipes/informationBulk")

    const queryParams = {
        apiKey: apiKey,
        ids: ids.join(",")
    }

    url.search = new URLSearchParams(queryParams).toString()

    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    return { results: json };
}

const schema = {
    type: "object",
    properties: {
        get_recipeName: {
            type: "string",
            description: "Generate a recipe for a dish with the following ingredients. Please provide the name of the dish."
        },
        get_ingredients: {
            type: "array",
            description: "List of ingredients that will be used in making this dish.",
            items: {
                type: "object",
                properties: {
                    listItem: { type: "string" }
                }
            }
        },
        get_instructions: {
            type: "array",
            description: "Give all the cooking instructions serial wise.",
            items: {
                type: "object",
                properties: {
                    listItems: { type: "string" }
                }
            }
        }
    },
    required: ["get_recipeName", "get_ingredients", "get_instructions"]
}

export const chatGpt = async (prompt: any, servings: string, dishType: string, spiceLevel: string, allergyType: string) => {
    try {
        if (!prompt) {
            throw new Error("Prompt is null or undefined");
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a `food connoisseur` asistant who knows all recipes.Generate me a recipes with the following ingredients.",
                },
                {
                    role: "user",
                    content: `${prompt} Servings: ${servings} Dish Type: ${dishType} Spice Level:${spiceLevel} strictly avoid using: ${allergyType} `,
                },
            ],
            functions: [
                {
                    name: "get_recipe_details",
                    "parameters": schema
                }
            ],
            function_call: {
                name: "get_recipe_details"
            },
            temperature: 0.5
        });

        console.log(response);

        return response.choices[0].message.function_call?.arguments;
    } catch (error) {
        console.error(error);
    }
};
