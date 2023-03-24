$(document).ready(function() {
    // Check if user has MetaMask installed
    if (window.ethereum) {
        console.log('MetaMask is installed');
        window.web3 = new Web3(window.ethereum);
        // Request account access if needed
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts) {
            console.log('Connected to MetaMask:', accounts[0]);
        })
        .catch(function(error) {
            console.error(error);
            $('#status').text('Error connecting to MetaMask');
        });
    } else {
        console.log('MetaMask is not installed');
    }

    // Connect to contract
    const contractAddress = "0x3e9798fC9CC07681C0dB6Befd2756d23D6964799";
    const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_polyPenTokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BetPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Winner",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "generateWinningNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_number",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "polyPenToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "winningNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Listen for form submission
    $('#bet-form').submit(function(event) {
        event.preventDefault();
        const number = $('#number-input').val();
        const amount = $('#amount-input').val();
        const player = web3.eth.defaultAccount;

        // Check if user is logged in to MetaMask
        if (typeof player === 'undefined') {
            $('#status').text('Please connect to MetaMask and refresh the page');
            return;
        }

        // Place bet
        function placeBet(number, amount) {
    const gasLimit = 500000; // set custom gas limit
    const gasPrice = web3.utils.toWei('5', 'gwei'); // set custom gas price to 5 gwei

    contract.methods.placeBet(number, amount).send({
        from: web3.eth.defaultAccount,
        gas: gasLimit,
        gasPrice: gasPrice
    })
    .on('transactionHash', function(hash) {
        console.log('Transaction hash:', hash);
        $('#status').text('Transaction sent, waiting for confirmation...');
    })
    .on('confirmation', function(confirmationNumber, receipt) {
        console.log('Confirmation:', receipt);
        $('#status').text('Bet placed successfully!');
    })
    .on('error', function(error) {
        console.error('Error:', error);
        $('#status').text('Error placing bet');
    });
}


    // Listen for winning number generation
    $('#generate-button').click(function() {
        const player = web3.eth.defaultAccount;

        // Check if user is logged in to MetaMask
        if (typeof player === 'undefined') {
            $('#status').text('Please connect to MetaMask and refresh the page');
            return;
        }

        // Generate winning number
        contract.methods.generateWinningNumber().send({from: player})
        .on('transactionHash', function(hash){
            console.log(hash);
            $('#status').text('Transaction sent, waiting for confirmation...');
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log(receipt);
            $('#status').text('Winning number generated and prize distributed!');
        })
        .on('error', function(error) {
            console.error(error);
            $('#status').text('Error generating winning number');
        });
    });

    // Listen for fee withdrawal
    $('#withdraw-button').click(function() {
        const player = web3.eth.defaultAccount;

        // Check if user is logged in to MetaMask
        if (typeof player === 'undefined') {
            $('#status').text('Please connect to MetaMask and refresh the page');
            return;
        }

        // Withdraw fees
        contract.methods.withdrawFees().send({from: player})
        .on('transactionHash', function(hash){
            console.log(hash);
            $('#status').text('Transaction sent, waiting for confirmation...');
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log(receipt);
            $('#status').text('Fees withdrawn successfully!');
        })
        .on('error', function(error) {
            console.error(error);
            $('#status').text('Error withdrawing fees');
        });
    });
});
