"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const RecipeAPI = __importStar(require("./recipe-api"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = process.env.PORT;
const prismaClient = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page);
    const results = await RecipeAPI.searchRecipes(searchTerm, page);
    return res.json(results);
});
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
});
app.post("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        const favRecipe = await prismaClient.favResipies.create({
            data: {
                recipeId
            }
        });
        return res.status(201).json(favRecipe);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Oops! Something went wrong" });
    }
});
app.get("/api/recipes/favourite", async (_, res) => {
    try {
        const favRecipes = await prismaClient.favResipies.findMany();
        const recipeIds = favRecipes.map((recipe) => recipe.recipeId.toString());
        const favorites = await RecipeAPI.getFavRecipedByIDs(recipeIds);
        return res.json(favorites);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.delete('/api/recipes/favourite', async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favResipies.delete({
            where: {
                recipeId: recipeId
            }
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Oops! Something went wrong" });
    }
});
app.post("/chat", async (req, res) => {
    const { prompt, servings, dishType, spiceLevel, allergyType } = req.body;
    try {
        const chatGptResponse = await RecipeAPI.chatGpt(prompt, servings, dishType, spiceLevel, allergyType);
        return res.json({ chatGptResponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
//# sourceMappingURL=index.js.map