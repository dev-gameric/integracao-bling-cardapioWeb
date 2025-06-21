const express = require('express');
const router = express.Router();
const rawBodySaver = require('body-parser').raw;
const { validateHmac } = require('../utils/hmacValidator');
const { handlePedido, handleEstoque } = require('../controllers/webhookController');

// Recebe raw buffer para validar HMAC
router.post('/pedido', rawBodySaver({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-bling-signature'];
  if (!validateHmac(req.body, signature)) return res.status(401).send('Assinatura inválida');
  // Converte buffer em JSON
  req.body = JSON.parse(req.body.toString());
  handlePedido(req, res);
});

router.post('/estoque', rawBodySaver({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-bling-signature'];
  if (!validateHmac(req.body, signature)) return res.status(401).send('Assinatura inválida');
  req.body = JSON.parse(req.body.toString());
  handleEstoque(req, res);
});

module.exports = router;