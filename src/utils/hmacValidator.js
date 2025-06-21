const crypto = require('crypto');

function validateHmac(rawBody, signature) {
  const secret = process.env.BLING_HMAC_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return hash === signature;
}

module.exports = { validateHmac };