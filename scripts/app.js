// app.js

window.addEventListener("load", async () => {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Initialize web3
      const web3 = new Web3(window.ethereum);

      // Get ICO ABI
      const icoAbi = [
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_polyPenToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokensPerMatic",
        "type": "uint256"
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
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "MaticWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maticSpent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensReceived",
        "type": "uint256"
      }
    ],
    "name": "TokensPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokensWithdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "FEE_PERCENTAGE",
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
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
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
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokensPerMatic",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawMatic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

const bscContractAddress = '0x1234...'; // BSC contract address
const polygonContractAddress = "0xc60Df3aFBc1A37F09b5Ba068533FEdFb254634A2"; // Polygon contract address
let currentContractAddress = '';

async function getNetworkAndContractAddress() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask');
        return;
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await ethereum.request({ method: 'net_version' });

        switch (parseInt(networkId)) {
            case 56: // BSC
                currentContractAddress = bscContractAddress;
                console.log('Connected to BSC. Contract address:', currentContractAddress);
                break;
            case 137: // Polygon
                currentContractAddress = polygonContractAddress;
                console.log('Connected to Polygon. Contract address:', currentContractAddress);
                break;
            default:
                alert('Please switch to either BSC or Polygon network');
        }
    } catch (error) {
        console.error(error);
        alert('Error connecting to MetaMask');
    }
}


getNetworkAndContractAddress();

      // Set ICO contract address
      const icoAddress = currentContractAddress;

      // Create ICO contract instance
      const icoContract = new web3.eth.Contract(icoAbi, icoAddress);

      // Handle buy tokens button click
      document.getElementById("buyTokensButton").addEventListener("click", async () => {
        try {
          const maticAmount = document.getElementById("maticAmountInput").value;
          const accounts = await web3.eth.getAccounts();
          await icoContract.methods.buyTokens().send({
            from: accounts[0],
            value: web3.utils.toWei(maticAmount, "ether")
          });
        } catch (error) {
          console.error("Error buying tokens:", error);
        }
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("Non-Ethereum browser detected. Please install MetaMask.");
  }
});
