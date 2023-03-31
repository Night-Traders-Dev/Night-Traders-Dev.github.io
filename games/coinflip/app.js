// The contract address and ABI
const contractAddress = "CONTRACT_ADDRESS_HERE";
const contractABI = [];

// The Ethereum network ID
const networkId = 137; // Mainnet Polygon

// The betting token contract address and ABI
const tokenAddress = "TOKEN_ADDRESS_HERE";
const tokenABI = [];

// The minimum and maximum bet amounts
const minBet = 10000;
const maxBet = 10000000;

// The web3 instance and contract objects
let web3;
let contract;
let token;

// The account address
let account;

// The DOM elements
const balanceElement = document.getElementById("balance");
const betAmountElement = document.getElementById("bet-amount");
const coinflipResultElement = document.getElementById("coinflip-result");
const placeBetButton = document.getElementById("place-bet-btn");
const resultMessageElement = document.getElementById("result-message");
const winningAmountElement = document.getElementById("winning-amount");

// Function to initialize the web3 instance and contract objects
async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
        // Create a web3 instance
        web3 = new Web3(window.ethereum);

        try {
            // Request access to the user's accounts
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Set the account address
            account = accounts[0];

            // Create the contract object
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // Create the token object
            token = new web3.eth.Contract(tokenABI, tokenAddress);

            // Load the balance
            await loadBalance();

            // Enable the betting form
            enableBettingForm();
        } catch (error) {
            console.error(error);
        }
    } else {
        // Show an error message
        alert("MetaMask is not installed.");
    }
}

// Function to load the balance
async function loadBalance() {
    // Get the account's balance of the betting token
    const balance = await token.methods.balanceOf(account).call();

    // Display the balance
    balanceElement.textContent = `${web3.utils.fromWei(balance)} $PPN`;
}

// Function to enable the betting form
function enableBettingForm() {
    // Enable the bet amount input field
    betAmountElement.disabled = false;

    // Enable the coinflip result select field
    coinflipResultElement.disabled = false;

    // Enable the place bet button
    placeBetButton.disabled = false;

    // Add a click event listener to the place bet button
    placeBetButton.addEventListener("click", placeBet);
}

// Function to disable the betting form
function disableBettingForm() {
    // Disable the bet amount input field
    betAmountElement.disabled = true;

    // Disable the coinflip result select field
    coinflipResultElement.disabled = true;

    // Disable the place bet button
    placeBetButton.disabled = true;

    // Remove the click event listener from the place bet button
    placeBetButton.removeEventListener("click", placeBet);
}

// Function to place a bet
async function placeBet() {
    // Get the bet amount and coinflip result
    const betAmount = betAmountElement.value;
    const coinflipResult = coinflipResultElement.value;

    // Check if the bet amount is within the allowed range
    if (betAmount < minBet || betAmount > maxBet) {
        // Show an error message
        alert(`The bet amount must be between ${minBet} and ${maxBet}.`);
        return;
    }

   
// Disable the betting form
disableBettingForm();
// Transfer the bet amount from the user to the contract
try {
    await token.methods.approve(contractAddress, betAmount).send({ from: account });
    await contract.methods.placeBet(coinflipResult).send({ from: account, value: betAmount });
} catch (error) {
    console.error(error);
    // Show an error message
    alert("An error occurred while placing the bet.");
    // Enable the betting form
    enableBettingForm();
    return;
}

// Load the balance
await loadBalance();

// Get the result of the coinflip
const result = await contract.methods.results(0).call();

// Determine if the player won
const coinflipResultText = coinflipResult == 0 ? "heads" : "tails";
const resultMessage = result == coinflipResult ? `Congratulations! You won the coinflip with ${coinflipResultText}.` : `Sorry, you lost the coinflip. The result was ${result == 0 ? "heads" : "tails"}.`;

// Display the result message
resultMessageElement.textContent = resultMessage;

// If the player won, calculate and display the winning amount
if (result == coinflipResult) {
    const winningAmount = betAmount * 1.95;
    winningAmountElement.textContent = `You won ${winningAmount} $PPN!`;
}

// Display the results section
document.querySelector(".results").style.display = "block";

// Enable the betting form after 5 seconds
setTimeout(() => {
    enableBettingForm();
    resultMessageElement.textContent = "";
    winningAmountElement.textContent = "";
    document.querySelector(".results").style.display = "none";
}, 5000);

}

// Initialize the app
init();
