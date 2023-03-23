// coinflip.js

// Connect to Metamask
async function connect() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
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

window.addEventListener("DOMContentLoaded", async () => {
  // Load ABIs from JSON files
  const polyPenTokenABI = await loadABI('polyPenTokenABI.json');
  const coinflipContractABI = await loadABI('coinflipContractABI.json');

  // Replace with the correct contract addresses
  const polyPenTokenAddress = '0x7def6e73B2Be4D31fe1c918c3b55907cFc21bA8D';
  const coinflipContractAddress = '0x909dE4D8856d041335EaE89d421D331026C95e7d';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Initialize contract instances
  const polyPenToken = new ethers.Contract(polyPenTokenAddress, polyPenTokenABI, signer);
  const coinflipContract = new ethers.Contract(coinflipContractAddress, coinflipContractABI, signer);

  // Example game logic
  const playCoinflip = async () => {
    try {
      const playerAddress = await signer.getAddress();
      const betAmount = ethers.utils.parseEther('1');

      // Approve the coinflip contract to spend tokens on the player's behalf
      await polyPenToken.approve(coinflipContractAddress, betAmount);

      // Place bet and play coinflip
      const result = await coinflipContract.placeBet(true);
      console.log('Coinflip result:', result);
    } catch (error) {
      console.error('Error playing coinflip:', error);
    }
  };

  // Connect play button to playCoinflip function
  const playButton = document.getElementById('play-coinflip');
  playButton.addEventListener('click', playCoinflip);
});
