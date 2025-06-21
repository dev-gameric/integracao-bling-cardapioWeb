const axios = require('axios');

const client = axios.create({
  baseURL: 'https://portal.cardapioweb.com/api',
  headers: {
    Authorization: `Bearer ${process.env.CARDAPIO_WEB_TOKEN}`
  }
});

async function createOrder(data) {
  const res = await client.post('/orders', data);
  return res.data;
}

async function updateStock(items) {
  const res = await client.put('/stock', { items });
  return res.data;
}

module.exports = { createOrder, updateStock };