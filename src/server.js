const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const stockRoutes = require('./routes/stockRoutes');
const optionRoutes = require('./routes/optionRoutes');
const StockSimulator = require('./services/StockSimulator');

// Load configuration
const config = yaml.load(fs.readFileSync(path.resolve(__dirname, '../config/config.yaml'), 'utf8'));

const app = express();
const port = config.port || 3000;

// Initialize stock simulator
const stockSimulator = new StockSimulator();

// Middleware
app.use(express.json());

// Routes
app.use('/v1/marketdata', stockRoutes);
app.use('/v1/marketdata', optionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://${config.devhost}:${port}`);
});

// Start the simulation
stockSimulator.startSimulation(config.simulation.updateInterval);
