import { Configuration, OpenAIApi } from "openai";
export class IA {
    model: string;
    apiKey: string;
    core: OpenAIApi;
    constructor(model: string, apiKey: string) {
        this.apiKey = apiKey;
        this.model = model;
        const config = new Configuration({ apiKey });
        this.core = new OpenAIApi(config);
    }

}