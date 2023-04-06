import generateCode from "./src/gpt";

const express = require('express');

const app = express();
app.use(express.json());

app.get("/", async (req: { body: { question: any; }; }, res: { send: (arg0: string) => void; }) => {
    const { question } = req.body;
    const code = await generateCode(question);
    res.send(code ?? '');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});