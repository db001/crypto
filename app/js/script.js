// API url: https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=30

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=30';

const ticker = document.getElementsByClassName('ticker')[0];

const cryptoData = fetch(url);

// Global variable to hold data
let data = {};

cryptoData
  .then(response => {
    if(response.ok) {
      response.json()
        .then(json => {
          data = json;
          console.log(data);
          displayData(json);
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

//  Function to display data in the DOM
function displayData(data) {
  data.map(ele => {
    ticker.innerHTML += `
      <div class="currency">
        <div class="currency__name">${ele.name}</div>
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

// function sortBySevenDayChange(input) {

// }