
# Stock Option Simulator

Basic stock and option price simulator, modeled loosely after the old TDAmeritrade API (before Schwab shut it down).

There is no OAuth and the data that comes back likely isn't what the old API provided.

## Random Walk
The Stock price fluctuates based on a random walk approach, and is modified internally every 250ms (set in config/config.yaml).

The initial data only provides for AAPL, GOOGL, and MSFT, hardwired in src/routes/stockRoutes.js.

Future updates will likely include the ability to incorporate historical data and computed Implied Volatility on a per-stock basis.

## Blacks-Scholes Option Pricing
The Option price simulator is roughly based on Blacks-Scholes to give a somewhat realistic simulation.

## TODO

* Implement proper testing
* Implement loading of historical data (Parquet with checkpoints)
* Implement long-term storage of simulated data (added checkpoints)
* Computed Implied Volatility
* Review Blacks-Scholes implementation
* Review Greeks implementation
* Adjust Greeks per-stock 


```
stock-option-simulator/
├── config/
│   └── config.yaml
├── src/
│   ├── models/
│   │   ├── Stock.js
│   │   └── Option.js
│   ├── services/
│   │   ├── StockSimulator.js
│   │   └── OptionPricer.js
│   ├── routes/
│   │   ├── stockRoutes.js
│   │   └── optionRoutes.js
│   └── server.js
├── package.json
└── .env
```
