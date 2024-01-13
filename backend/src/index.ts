import "dotenv/config";
import express from "express"
import cors from "cors"
import * as RecipeAPI from "./recipe-api"
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const app = express();
const port = 4000;
const prismaClient = new PrismaClient();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json())
app.use(cors())

app.get("/api/recipes/search", async (req, res) => {
    // https://api.spoonacular.com/recipes/serach?searchTerm=burger&page=2

    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);

    const results = await RecipeAPI.searchRecipes(searchTerm, page);

    return res.json(results);
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {

    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId)

    return res.json(results);
});

app.post("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;

    try {
        const favRecipe = await prismaClient.favResipies.create(
            {
                data: {
                    recipeId
                }
            }
        );
        return res.status(201).json(favRecipe)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Oops! Something went wrong" })
    }
})

app.get("/api/recipes/favourite", async (req, res) => {
    try {
        const favRecipes = await prismaClient.favResipies.findMany();

        const recipeIds = favRecipes.map((recipe) => recipe.recipeId.toString())

        const favorites = await RecipeAPI.getFavRecipedByIDs(recipeIds);

        return res.json(favorites);
    } catch (error) {
        console.log(error);
    }

})

app.delete('/api/recipes/favourite', async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favResipies.delete({
            where: {
                recipeId: recipeId
            }
        })
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Oops! Something went wrong" })
    }
})


app.post("/chat", async (req, res) => {
    const { prompt, servings, dishType, spiceLevel, allergyType } = req.body;
    try {
        const chatGptResponse = await RecipeAPI.chatGpt(prompt, servings, dishType, spiceLevel, allergyType);
        return res.json({ chatGptResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})