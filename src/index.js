require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importa rotas
const webhookRoutes = require('./routes/webhookRoutes');
app.use('/webhook', webhookRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));