const { getOrderDetails } = require('../services/blingService');
const { createOrder, updateStock } = require('../services/cardapioService');

async function handlePedido(req, res) {
  try {
    const { pedido } = req.body;
    const orderId = pedido.codigo;
    const details = await getOrderDetails(orderId);
    // Mapeie o payload conforme Cardápio Web espera
    const cwData = {
      customer: details.pedido.cliente.nome,
      items: details.pedido.itens.map(i => ({
        productId: i.idProduto,
        quantity: parseInt(i.quantidade)
      })),
      total: details.pedido.totalPedido
    };

    const result = await createOrder(cwData);
    console.log('Pedido criado no Cardápio Web:', result);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Erro ao processar pedido:', err.message);
    res.status(500).send('Erro interno');
  }
}

async function handleEstoque(req, res) {
  try {
    const { estoque } = req.body;
    const items = estoque.map(item => ({
      productId: item.idProduto,
      stock: parseInt(item.quantidade)
    }));
    const result = await updateStock(items);
    console.log('Estoque atualizado:', result);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Erro ao atualizar estoque:', err.message);
    res.status(500).send('Erro interno');
  }
}

module.exports = { handlePedido, handleEstoque };