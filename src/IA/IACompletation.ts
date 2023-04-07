import { IA } from "./IA";
import { ModelsCompletation } from "./gpt_models/ModelsCompletation";

export class IACompletation extends IA {
    constructor(model: ModelsCompletation, apiKey: string) {
        super(model, apiKey);
    }

    createCompletion = (prompt: string) => this.core.createCompletion({
        model: this.model,
        prompt
    });
}
