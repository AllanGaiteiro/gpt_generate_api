import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
const apiKey = "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";

export default async function generateCode(question: string): Promise<string | null> {
    const config = new Configuration({ apiKey });
    const chat = new OpenAIApi(config);

    const params: CreateChatCompletionRequest = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
    };

    try {
        const { data } = await chat.createChatCompletion(params);
        return data.choices[0].message?.content ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}