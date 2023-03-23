// coinflip.js

// Connect to Metamask
async function connect() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      return true;
    } catch (err) {
      console.error("User denied account access");
      return false;
    }
  } else {
    alert("Please install MetaMask!");
    return false;
  }
}

// Function to load ABI from a JSON file
async function loadABI(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    const abi = await response.json();
    return abi;
  } catch (error) {
    console.error(`Error loading ABI from ${jsonPath}:`, error);
  }
}

(async () => {
  // Load ABIs from JSON files
  const polyPenTokenABI = await loadABI('polyPenTokenABI.json');
  const coinflipContractABI = await loadABI('coinflipContractABI.json');

  // Replace with the correct contract addresses
  const polyPenTokenAddress = '0x7def6e73B2Be4D31fe1c918c3b55907cFc21bA8D';
  const coinflipContractAddress = '0x909dE4D8856d041335EaE89d421D331026C95e7d';

  // Initialize contract instances
  const polyPenToken = new web3.eth.Contract(polyPenTokenABI, polyPenTokenAddress);
  const coinflipContract = new web3.eth.Contract(coinflipContractABI, coinflipContractAddress);

  // Example game logic
  const playCoinflip = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const playerAddress = accounts[0];
      const betAmount = web3.utils.toWei('1', 'ether');

      // Approve the coinflip contract to spend tokens on the player's behalf
      await polyPenToken.methods.approve(coinflipContractAddress, betAmount).send({ from: playerAddress });

      // Place bet and play coinflip
      const result = await coinflipContract.methods.placeBet(true).send({ from: playerAddress });
      console.log('Coinflip result:', result);
    } catch (error) {
      console.error('Error playing coinflip:', error);
    }
  };

  // Connect play button to playCoinflip function
  const playButton = document.getElementById('play-coinflip');
  playButton.addEventListener('click', playCoinflip);
})();
