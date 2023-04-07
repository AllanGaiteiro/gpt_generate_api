import { IA } from "./IA";
import { ModelsChatCompletation } from "./gpt_models/ModelsChatCompletation";

export class IAChatCompletation extends IA {
    constructor(model: ModelsChatCompletation, apiKey: string) {
        super(model, apiKey);
    }

    createChatCompletion = (content: string) => this.core.createChatCompletion({
        model: this.model,
        messages: [{ role: "user", content }]
    });
}
