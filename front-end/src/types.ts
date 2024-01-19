export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string
}

export interface RecipeSummary {
    id: number;
    title: string;
    summary: string;
}

export interface chatGpt {
    prompt: string,
    chatGptResponse: string
}