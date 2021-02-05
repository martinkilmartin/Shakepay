const ENDPOINT_TRANSACTION_HISTORY =
  process.env.REACT_APP_ENDPOINT_TRANSACTION_HISTORY;
const ENDPOINT_HISTORICAL_BTC_RATE =
  process.env.REACT_APP_ENDPOINT_HISTORICAL_BTC_RATE;
const ENDPOINT_HISTORICAL_ETH_RATE =
  process.env.REACT_APP_ENDPOINT_HISTORICAL_ETH_RATE;

export async function getTransactions() {
  const data = {};
  data.transactionHistory = await getTransactionHistory();
  data.historicalBTCRate = await getHistoricalBTCRate();
  data.historicalETCRate = await getHistoricalETHRate();
  return data;
}

async function getTransactionHistory() {
  try {
    const response = await fetchFromAPI(ENDPOINT_TRANSACTION_HISTORY);
    const body = await response.json();

    return body;
  } catch (error) {
    return { transactionError: error.message };
  }
}

async function getHistoricalBTCRate() {
  try {
    const response = await fetchFromAPI(ENDPOINT_HISTORICAL_BTC_RATE);
    const body = await response.json();

    return body;
  } catch (error) {
    return { historicalBTCRateError: error.message };
  }
}

async function getHistoricalETHRate() {
  try {
    const response = await fetchFromAPI(ENDPOINT_HISTORICAL_ETH_RATE);
    const body = await response.json();

    return body;
  } catch (error) {
    return { historicalETHRateError: error.message };
  }
}

function fetchFromAPI(url) {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 5000);

  return fetch(
    url,
    {
      method: "GET",
    },
    { signal }
  );
}

function parseData(data) {
  const transactions = [];
  const btcHistoricalPriceMap = new Map();
  const ethHistoricalPriceMap = new Map();
  const chartPoints = [];

  if (data.transactionHistory.length > 0) {
    data.transactionHistory.forEach((tx) => {
      transactions.push(
        new Transaction(
          tx.currency,
          tx.direction,
          tx.amount,
          tx.createdAt.substring(0, 10)
        )
      );
    });
  }

  if (data.historicalBTCRate.length > 0) {
    data.historicalBTCRate.forEach((btc) => {
      btcHistoricalPriceMap.set(
        btc.createdAt.substring(0, 10),
        btc.midMarketRate
      );
    });
  }

  if (data.ethHistoricalPriceMap.length > 0) {
    data.historicalETCRate.forEach((btc) => {
      ethHistoricalPriceMap.set(
        btc.createdAt.substring(0, 10),
        btc.midMarketRate
      );
    });
  }

  if (transactions.length > 0) {
      let netWorth = 0;
    transactions.forEach((tx) => {
        const amount = tx.direction === 'credit' ? tx.amount : -tx.amount;
        netWorth = netWorth + amount;
      chartPoints.push(new ChartPoint(tx.date, tx.currency, amount, ));
    });
  }
}

class Transaction {
  constructor(currency, direction, amount, date) {
    this.currency = currency;
    this.direction = direction;
    this.amount = amount;
    this.date = date;
  }
}

class ChartPoint {
  constructor(date, currency, amount, netWorth) {
    this.date = date;
    this.currency = currency;
    this.amount = amount;
    this.netWorth = netWorth;
  }
}
