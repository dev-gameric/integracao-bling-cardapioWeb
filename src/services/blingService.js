const axios = require('axios');

async function getOrderDetails(orderId) {
  const url = `https://bling.com.br/Api/v2/pedido/${orderId}/json/`;
  const params = { apikey: process.env.BLING_API_KEY };
  const res = await axios.get(url, { params });
  return res.data;
}

module.exports = { getOrderDetails };