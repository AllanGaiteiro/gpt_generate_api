import /*express, */ { Request, Response } from 'express';
import { CreateCompletionResponseChoicesInner } from 'openai';
import { IAChatCompletation } from './IA/IAChatCompletation';
import { IACompletation } from './IA/IACompletation';
import { IAEdit } from "./IA/IAEdit";
import { ModelsChatCompletation } from './IA/gpt_models/ModelsChatCompletation';
import { ModelsCompletation } from './IA/gpt_models/ModelsCompletation';
import { ModelsEdit } from "./IA/gpt_models/ModelsEdit";
const express = require('express');
const apiKey = "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";
const appController = express();
appController.use(express.json());

appController.get("/", async (req: Request, res: Response) => {
    res.send('hello');
});

appController.get("/ia-chat-completion", async (req: Request<{ body: { question: string; } }>, res: Response<{ message: string }>) => {
    const { question } = req.body;
    const ia = new IAChatCompletation(ModelsChatCompletation.GPT35Turbo, apiKey);
    const result = await ia.createChatCompletion(question);
    const message = result.data.choices[0].message?.content ?? '';
    res.send({ message });
});

appController.get("/ia-completion", async (req: Request<{ body: { question: string; } }>, res: Response<{ code: CreateCompletionResponseChoicesInner[] | string }>) => {
    const { question } = req.body;
    const ia = new IACompletation(ModelsCompletation.Davinci003, apiKey);
    const result = await ia.createCompletion(question);
    const code = result?.data?.choices;
    res.send({ code });
});

appController.get("/ia-edit", async (req: Request<{ body: { question: string; } }>, res: Response<{ code: CreateCompletionResponseChoicesInner[] }>) => {
    const { question } = req.body;
    const ia = new IAEdit(ModelsEdit.Code001, apiKey);
    const result = await ia.createEdit(question);
    const code = result.data.choices;
    res.json({ code });
});

export default appController;