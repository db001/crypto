const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=30';

const ticker = document.getElementsByClassName('ticker')[0];

const getData = url => {

  const cryptoData = fetch(url);

  cryptoData
  .then(response => {
    if(response.ok) {
      response.json()
        .then(json => {
          displayData(sortData(json, 'price_gbp', true));
          currencyData = json;
        })
        .then(() => {
          const trends = Array.from(document.getElementsByClassName('currency__trend--change'));
          addPosOrNegClass(trends);
        })
    } else {
      throw new Error('No response from network');
    }
  })
  .catch(error => console.log(`Problem with Fetch function: ${error.message}`));
}

// Call getData to fill page on page load
getData(url);

//  Function to display data in the DOM
function displayData(data) {
  data.map(ele => {
    ticker.innerHTML += `
      <div class="currency">
        <div class="currency__name">${data.indexOf(ele) + 1}. ${ele.name}</div>
        <div class="currency__value">Value: £${parseFloat(ele.price_gbp).toFixed(2)}</div>
        <div class="trend-container">
          <div class="currency__trend">1h <span class="currency__trend--change">${ele.percent_change_1h}%</span></div>  
          <div class="currency__trend">24h <span class="currency__trend--change">${ele.percent_change_24h}%</span></div>  
          <div class="currency__trend">7d <span class="currency__trend--change">${ele.percent_change_7d}%</span></div> 
        </div>
      </div>
    `
  })
}

// Add relevant class name to element depending on positive or negative
function addPosOrNegClass(arr) {
  arr.map(ele => {
    if(parseFloat(ele.innerHTML) > 0) {
      ele.className += " positive_change";
    } else if (parseFloat(ele.innerHTML) < 0) {
      ele.className += " negative_change";      
    }
  })
}

// Sort data depending on which field is selected
function sortData(data, sortField, ascending = true) {
  let sortedData;

  // Helper compare functions for sortData
  function compareAsc(a, b) {
    const fieldA = parseInt(a[sortField]);
    const fieldB = parseInt(b[sortField]);

    let comparison = 0;
    if(fieldA > fieldB) {
      comparison = -1;
    } else if (fieldB > fieldA) {
      comparison = 1;
    }
    return comparison;
  }

  function compareDesc(a, b) {
    const fieldA = parseInt(a[sortField]);
    const fieldB = parseInt(b[sortField]);

    let comparison = 0;
    if(fieldA > fieldB) {
      comparison = 1;
    } else if (fieldB > fieldA) {
      comparison = -1;
    }
    return comparison;
  }
  if(ascending) {
    sortedData = data.sort(compareAsc);
  } else if(!ascending) {
    sortedData = data.sort(compareDesc);
  } 
  
  // console.table(sortedData, ['id', 'price_gbp']);
  return sortedData;
}

// const madeUpData = [
//     {
//     "id": "bitcoin",
//     "name": "Bitcoin",
//     "symbol": "BTC",
//     "rank": "1",
//     "price_usd": "13565.9",
//     "price_btc": "1.0",
//     "24h_volume_usd": "17090700000.0",
//     "market_cap_usd": "227865228501",
//     "available_supply": "16796912.0",
//     "total_supply": "16796912.0",
//     "max_supply": "21000000.0",
//     "percent_change_1h": "0.3",
//     "percent_change_24h": "-7.04",
//     "percent_change_7d": "-11.35",
//     "last_updated": "1515705563",
//     "price_gbp": "10017.6574596",
//     "24h_volume_gbp": "12620524870.8",
//     "market_cap_gbp": "168265710795"
//     },
//     {
//     "id": "ethereum",
//     "name": "Ethereum",
//     "symbol": "ETH",
//     "rank": "2",
//     "price_usd": "1186.06",
//     "price_btc": "0.0876857",
//     "24h_volume_usd": "8151010000.0",
//     "market_cap_usd": "114951538502",
//     "available_supply": "96918822.0",
//     "total_supply": "96918822.0",
//     "max_supply": null,
//     "percent_change_1h": "0.32",
//     "percent_change_24h": "-8.15",
//     "percent_change_7d": "17.86",
//     "last_updated": "1515705550",
//     "price_gbp": "875.83889064",
//     "24h_volume_gbp": "6019064428.44",
//     "market_cap_gbp": "84885273898.0"
//     },
//     {
//     "id": "ripple",
//     "name": "Ripple",
//     "symbol": "XRP",
//     "rank": "3",
//     "price_usd": "1.98972",
//     "price_btc": "0.0001471",
//     "24h_volume_usd": "6070280000.0",
//     "market_cap_usd": "77080047234.0",
//     "available_supply": "38739142811.0",
//     "total_supply": "99993093880.0",
//     "max_supply": "100000000000",
//     "percent_change_1h": "-2.55",
//     "percent_change_24h": "-0.02",
//     "percent_change_7d": "-41.2",
//     "last_updated": "1515705541",
//     "price_gbp": "1.4692967957",
//     "24h_volume_gbp": "4482561844.32",
//     "market_cap_gbp": "56919298400.0"
//     },
//     {
//     "id": "bitcoin-cash",
//     "name": "Bitcoin Cash",
//     "symbol": "BCH",
//     "rank": "4",
//     "price_usd": "2526.62",
//     "price_btc": "0.186794",
//     "24h_volume_usd": "2349880000.0",
//     "market_cap_usd": "42716079951.0",
//     "available_supply": "16906413.0",
//     "total_supply": "16906413.0",
//     "max_supply": "21000000.0",
//     "percent_change_1h": "0.76",
//     "percent_change_24h": "-8.9",
//     "percent_change_7d": "4.17",
//     "last_updated": "1515705553",
//     "price_gbp": "1865.76737928",
//     "24h_volume_gbp": "1735254786.72",
//     "market_cap_gbp": "31543432943.0"
//     },
//     {
//     "id": "cardano",
//     "name": "Cardano",
//     "symbol": "ADA",
//     "rank": "5",
//     "price_usd": "0.726515",
//     "price_btc": "0.00005371",
//     "24h_volume_usd": "237921000.0",
//     "market_cap_usd": "18836405652.0",
//     "available_supply": "25927070538.0",
//     "total_supply": "31112483745.0",
//     "max_supply": "45000000000.0",
//     "percent_change_1h": "0.55",
//     "percent_change_24h": "-7.14",
//     "percent_change_7d": "-37.47",
//     "last_updated": "1515705555",
//     "price_gbp": "0.5364906427",
//     "24h_volume_gbp": "175691334.924",
//     "market_cap_gbp": "13909630735.0"
//     },
//     {
//     "id": "litecoin",
//     "name": "Litecoin",
//     "symbol": "LTC",
//     "rank": "6",
//     "price_usd": "233.349",
//     "price_btc": "0.0172516",
//     "24h_volume_usd": "1077360000.0",
//     "market_cap_usd": "12767371583.0",
//     "available_supply": "54713633.0",
//     "total_supply": "54713633.0",
//     "max_supply": "84000000.0",
//     "percent_change_1h": "0.76",
//     "percent_change_24h": "-5.56",
//     "percent_change_7d": "-1.99",
//     "last_updated": "1515705541",
//     "price_gbp": "172.315168956",
//     "24h_volume_gbp": "795570027.84",
//     "market_cap_gbp": "9427988941.0"
//     }
//   ]

// sortData(madeUpData, 'price_gbp', true);
// sortData(madeUpData, 'price_gbp', false);
// sortData(madeUpData, 'id', true);
// sortData(madeUpData, 'id', false);
