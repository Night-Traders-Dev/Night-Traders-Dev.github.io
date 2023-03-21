(async function () {
  const Web3 = require('web3');
  const PolyPenICO_ABI = []; // Add the PolyPenICO contract ABI JSON here
  const IERC20_ABI = []; // Add the IERC20 contract ABI JSON here

  let web3;
  let accounts;
  let polyPenToken;
  let polyPenICO;

  const buyTokensButton = document.getElementById('buyTokensButton');
  const maticAmountInput = document.getElementById('maticAmountInput');

  async function init() {
    if (window.ethereum) {
      try {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    accounts = await web3.eth.getAccounts();
    polyPenToken = new web3.eth.Contract(IERC20_ABI, '0x7def6e73B2Be4D31fe1c918c3b55907cFc21bA8D');
    polyPenICO = new web3.eth.Contract(PolyPenICO_ABI, '0x0ebEAa24aE030433627E84919da3450763904Fe4');
  }

  async function buyTokens() {
    const maticAmount = maticAmountInput.value;
    const weiAmount = web3.utils.toWei(maticAmount, 'ether');

    try {
      await polyPenICO.methods.buyTokens().send({ from: accounts[0], value: weiAmount });
      alert('Tokens purchased successfully!');
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      alert('Error purchasing tokens. Please try again.');
    }
  }

  buyTokensButton.addEventListener('click', buyTokens);
  await init();
})();
