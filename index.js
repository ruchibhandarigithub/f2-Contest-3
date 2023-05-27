// index.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const sortMarketCapBtn = document.getElementById('sortMarketCapBtn');
    const sortPercentageChangeBtn = document.getElementById('sortPercentageChangeBtn');
  
    let cryptoData = []; // Holds the original data fetched from the API
  
    // Fetch data using .then method
    fetchDataWithThen();
  
    // Fetch data using async/await method
    fetchDataWithAsyncAwait();
  
    function fetchDataWithThen() {
      const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          cryptoData = data; // Store the fetched data
          renderTable(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    async function fetchDataWithAsyncAwait() {
        const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        cryptoData = data; // Store the fetched data
        renderTable(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    function renderTable(data) {
      const tableBody = document.getElementById('cryptoTableBody');
  
      // Clear existing table data
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
  
      data.forEach(crypto => {
        const row = document.createElement('tr');
        const { name, id, image, symbol, current_price, total_volume, price_change_percentage_24h } = crypto;
        const priceChangePercentage = parseFloat(price_change_percentage_24h).toFixed(2);
  
        row.innerHTML = `
            <td><img src="${image}" alt="${name}" width="32" height="32"></td>
            <td>${id}</td>

          <td>${name}</td>
          <td>${symbol}</td>
          <td>$${current_price}</td>
          <td>${priceChangePercentage}%</td>
        `;
  
        tableBody.appendChild(row);
      });
    }
  
    function filterData() {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchText));
      renderTable(filteredData);
    }
  
    function sortData(sortBy) {
      const sortedData = [...cryptoData];
  
      if (sortBy === 'market_cap') {
        sortedData.sort((a, b) => a.market_cap - b.market_cap);
      } else if (sortBy === 'percentage_change') {
        sortedData.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      }
  
      renderTable(sortedData);
    }
  
    searchInput.addEventListener('input', filterData);
    sortMarketCapBtn.addEventListener('click', () => sortData('market_cap'));
    sortPercentageChangeBtn.addEventListener('click', () => sortData('percentage_change'));
  });
  