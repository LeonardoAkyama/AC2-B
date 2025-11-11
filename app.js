const express = require('express');
const professoresRouter = require('./routes/professores');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/professores', professoresRouter);

app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
});