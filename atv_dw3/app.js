const express = require('express');
const app = express();
const port = 4800;

app.use(express.json());

app.post('/imc', (req, res) => {
    const { peso, altura } = req.body;

    if (!peso || !altura) {
        return res.status(400).json({ message: "Peso e altura são obrigatórios" });
    }

    const imc = peso / (altura * altura);
    let classificacao = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacao = 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
        classificacao = 'Sobrepeso';
    } else {
        classificacao = 'Obesidade';
    }

    res.json({ imc, classificacao });
});

app.post('/notas', (req, res) => {
    const { p1, p2 } = req.body;

    if (p1 === undefined || p2 === undefined) {
        return res.status(400).json({ message: "Notas P1 e P2 são obrigatórias" });
    }

    const media = (p1 + p2) / 2;
    const status = media >= 6 ? 'Aprovado' : 'Reprovado';

    res.json({ media, status });
});

app.post('/dolar', (req, res) => {
    const { r, d } = req.body;

    if (r === undefined || d === undefined) {
        return res.status(400).json({ message: "Valor em reais e valor do dólar são obrigatórios" });
    }

    const dolares = r / d;

    res.json({ dolares });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
