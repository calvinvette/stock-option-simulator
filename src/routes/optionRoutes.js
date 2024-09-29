const express = require('express');
const router = express.Router();
const StockSimulator = require('../services/StockSimulator');
const OptionPricer = require('../services/OptionPricer');

const stockSimulator = new StockSimulator();
const optionPricer = new OptionPricer();

router.get('/chains', (req, res) => {
  const { symbol } = req.query;
  const stock = stockSimulator.getStock(symbol);

  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  // Generate some sample options (you can expand this)
  const expirations = [30, 60, 90]; // Days to expiration
  const strikes = [0.9, 0.95, 1, 1.05, 1.1].map(factor => stock.price * factor);

  const options = [];

  for (const expiration of expirations) {
    for (const strike of strikes) {
      const timeToExpiration = expiration / 365; // Convert days to years

      const callOption = optionPricer.calculateOptionPrice(stock, strike, timeToExpiration, 'call');
      const putOption = optionPricer.calculateOptionPrice(stock, strike, timeToExpiration, 'put');

      options.push({
        type: 'call',
        strike,
        expiration: expiration,
        ...callOption
      });

      options.push({
        type: 'put',
        strike,
        expiration: expiration,
        ...putOption
      });
    }
  }

  res.json({
    underlying: symbol,
    underlyingPrice: stock.price,
    options
  });
});

module.exports = router;
