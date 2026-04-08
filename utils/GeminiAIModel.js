import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export async function runGemini(prompt) {
    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const models = ["gemini-3-flash-preview", "gemini-1.5-flash"];

    for (let model of models) {
        try {
            const response = await ai.models.generateContent({
                model,
                config: {
                    thinkingConfig: {
                        thinkingLevel: ThinkingLevel.LOW,
                    },
                },
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            });

            return response.text;
        } catch (error) {
            console.log(`${model} failed, trying next...`);
        }
    }

    throw new Error("All Gemini models failed. Try again later.");
}