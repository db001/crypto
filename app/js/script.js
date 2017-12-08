// API url: https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=30

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=30';

const cryptoData = fetch(url);

cryptoData
  .then(response => {
    if(response.ok) {
      response.json()
        .then(data => console.log(data));
    }
    throw new Error('No response from network');
  })
  .catch(error => console.log(`Problem with Fetch function: ${error.message}`));

