import /*express, */ { Request, Response } from 'express';
import { CreateCompletionResponseChoicesInner } from 'openai';
import { IAChatCompletation } from '../IA/IAChatCompletation';
import { IACompletation } from '../IA/IACompletation';
import { IAEdit } from "../IA/IAEdit";
import { ModelsChatCompletation } from '../IA/gpt_models/ModelsChatCompletation';
import { ModelsCompletation } from '../IA/gpt_models/ModelsCompletation';
import { ModelsEdit } from "../IA/gpt_models/ModelsEdit";
const express = require('express');
const apiKey = "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";
const appController = express();
appController.use(express.json());

/**
 * @swagger
 * tags:
 *   name: IA API
 *   description: Endpoints relacionados à IA
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Exibe uma saudação
 *     responses:
 *       '200':
 *         description: Uma mensagem de saudação
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
appController.get("/", async (req: Request, res: Response) => {
    res.send('hello');
});

/**
 * @swagger
 * /ia-chat-completion:
 *   get:
 *     summary: Retorna a resposta da IA chat completion para uma pergunta dada
 *     tags: [IA API]
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         description: A pergunta que deve ser respondida pela IA
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A resposta da IA chat completion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
appController.get("/ia-chat-completion", async (req: Request<{ query: { question: string } }>, res: Response<{ message: string }>) => {
    const { question } = req.query;
    if (typeof question !== 'string') {
        throw new Error('Question must be a string');
    }
    const ia = new IAChatCompletation(ModelsChatCompletation.GPT35Turbo, apiKey);
    const result = await ia.createChatCompletion(question);
    const message = result.data.choices[0].message?.content ?? '';
    res.send({ message });
});

/**
 * @swagger
 * /ia-completion:
 *   get:
 *     summary: Retorna a resposta da IA completion para uma pergunta dada
 *     tags: [IA API]
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         description: A pergunta que deve ser respondida pela IA
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A resposta da IA completion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                       index:
 *                         type: number
 */
appController.get("/ia-completion", async (req: Request<{ query: { question: string } }>, res: Response<{ code: CreateCompletionResponseChoicesInner[] | string }>) => {
    const { question } = req.query;
    if (typeof question !== 'string') {
        throw new Error('Question must be a string');
    }
    const ia = new IACompletation(ModelsCompletation.Davinci003, apiKey);
    const result = await ia.createCompletion(question);
    const code = result?.data?.choices;
    res.send({ code });
});

/**
 * @swagger
 * /ia-edit:
 *   get:
 *     summary: Retorna a resposta da IA edit para uma pergunta dada
 *     tags: [IA API]
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         description: A pergunta que deve ser respondida pela IA
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A resposta da IA edit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                       index:
 *                         type: number
 */
appController.get("/ia-edit", async (req: Request<{ query: { question: string } }>, res: Response<{ code: CreateCompletionResponseChoicesInner[] }>) => {
    const { question } = req.query;
    if (typeof question !== 'string') {
        throw new Error('Question must be a string');
    }
    const ia = new IAEdit(ModelsEdit.Code001, apiKey);
    const result = await ia.createEdit(question);
    const code = result.data.choices;
    res.json({ code });
});

export default appController;