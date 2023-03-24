(async () => {
  const provider = await detectEthereumProvider();
  if (!provider) {
    alert('Please install MetaMask to use this application');
    return;
  }

  const web3 = new Web3(provider);
  const polyPenGiveawayAddress = '0x1293C09091f90712C17155F5008F6acE3017EAFD'; // Replace with the actual contract address
  const polyPenGiveawayABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_polyPenToken",
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
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenSent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "authorizeSender",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "authorizedSenders",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
    "name": "depositTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "revokeSenderAuthorization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sendTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  }
]; // Replace with the actual ABI of the PolyPen Giveaway contract
  const polyPenGiveaway = new web3.eth.Contract(polyPenGiveawayABI, polyPenGiveawayAddress);

  const $connect = document.getElementById('connect');
  const $giveaway = document.getElementById('giveaway');
  const $claimForm = document.getElementById('claim-form');
  const $giveawayAddress = document.getElementById('giveawayAddress');
  const $giveawayAmount = document.getElementById('giveawayAmount');
  const $claimStatus = document.getElementById('claim-status');

  $connect.addEventListener('click', async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      $connect.style.display = 'none';
      $giveaway.classList.remove('hidden');
    } catch (error) {
      console.error('User rejected connection:', error);
    }
  });

  $claimForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const giveawayAddress = $giveawayAddress.value;
    const amount = parseFloat($giveawayAmount.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const decimals = 18;
    const amountInUnits = BigInt(amount * 10 ** decimals);

    try {
      $claimStatus.textContent = 'Processing...';
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      await polyPenGiveaway.methods.claimGiveaway(giveawayAddress, amountInUnits.toString()).send({ from: account });
      $claimStatus.textContent = `Successfully claimed ${amount} PolyPen from ${giveawayAddress}`;
    } catch (error) {
      console.error('Error claiming giveaway:', error);
      $claimStatus.textContent = 'Error: Transaction failed';
    }
  });
})();
