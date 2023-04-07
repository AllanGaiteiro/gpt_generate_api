import { IA } from "./IA";
import { ModelsEdit } from "./gpt_models/ModelsEdit";

export class IAEdit extends IA {
    constructor(model: ModelsEdit, apiKey: string) {
        super(model, apiKey);
    }

    createEdit = (instruction: string) => this.core.createEdit({
        model: this.model,
        instruction,
        temperature: 0.2
    });
}
