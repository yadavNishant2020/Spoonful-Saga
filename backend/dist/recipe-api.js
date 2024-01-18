"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGpt = exports.getFavRecipedByIDs = exports.getRecipeSummary = exports.searchRecipes = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.API_KEY;
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const searchRecipes = async (searchTerm, page) => {
    if (!apiKey) {
        throw new Error("API key not found.");
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
    };
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchRes = await fetch(url);
        const resultJSON = await searchRes.json();
        return resultJSON;
    }
    catch (error) {
        throw new Error(`Error fetching recipes: ${error.message}`);
    }
};
exports.searchRecipes = searchRecipes;
const getRecipeSummary = async (recipeId) => {
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const queryParams = {
        apiKey: apiKey,
    };
    url.search = new URLSearchParams(queryParams).toString();
    const response = await fetch(url);
    const json = await response.json();
    return json;
};
exports.getRecipeSummary = getRecipeSummary;
const getFavRecipedByIDs = async (ids) => {
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
    const queryParams = {
        apiKey: apiKey,
        ids: ids.join(",")
    };
    url.search = new URLSearchParams(queryParams).toString();
    const searchResponse = await fetch(url);
    const json = await searchResponse.json();
    return { results: json };
};
exports.getFavRecipedByIDs = getFavRecipedByIDs;
const schema = {
    type: "object",
    properties: {
        get_recipeName: {
            type: "string",
            description: "Generate a recipe for a dish with the following ingredients. Please provide the name of the dish."
        },
        get_ingredients: {
            type: "array",
            description: "List of ingredients with quantity according to the serving size that will be used in making this dish.",
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
};
const chatGpt = async (prompt, servings, dishType, spiceLevel, allergyType) => {
    var _a;
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
        return (_a = response.choices[0].message.function_call) === null || _a === void 0 ? void 0 : _a.arguments;
    }
    catch (error) {
        console.error(error);
    }
};
exports.chatGpt = chatGpt;
//# sourceMappingURL=recipe-api.js.map