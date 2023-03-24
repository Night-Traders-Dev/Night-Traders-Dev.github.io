(async () => {
  const provider = await detectEthereumProvider();
  if (!provider) {
    alert('Please install MetaMask to use this application');
    return;
  }

  const web3 = new Web3(provider);
  const polyPenPayrollAddress = '0xbf20547964682DeD59de0aDd6a4f34FFC15aA309'; // Replace with the actual contract address
  const polyPenPayrollABI = [
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
        "name": "employee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
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
        "name": "employee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
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
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "employeeBalances",
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
]; // Replace with the actual ABI of the PolyPenPayroll contract
  const polyPenPayroll = new web3.eth.Contract(polyPenPayrollABI, polyPenPayrollAddress);

  const $connect = document.getElementById('connect');
  const $employee = document.getElementById('employee');
  const $balance = document.getElementById('balance');
  const $withdrawForm = document.getElementById('withdraw-form');
  const $withdrawAmount = document.getElementById('withdrawAmount');
  const $withdrawStatus = document.getElementById('withdraw-status');

  $connect.addEventListener('click', async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      $connect.style.display = 'none';
      $employee.classList.remove('hidden');
      updateBalance(account);
    } catch (error) {
      console.error('User rejected connection:', error);
    }
  });

  async function updateBalance(account) {
    try {
      const balance = await polyPenPayroll.methods.employeeBalances(account).call();
      const decimals = 18;
      const humanReadableBalance = parseFloat(web3.utils.fromWei(balance, 'ether')).toFixed(decimals);
      $balance.textContent = `Your balance: ${humanReadableBalance} PolyPen`;
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }

  $withdrawForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = parseFloat($withdrawAmount.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const decimals = 18;
    const amountInUnits = BigInt(amount * 10 ** decimals);

    try {
      $withdrawStatus.textContent = 'Processing...';
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      await polyPenPayroll.methods.withdrawTokens(amountInUnits.toString()).send({ from: account });
      $withdrawStatus.textContent = `Successfully withdrew ${amount} PolyPen`;
      updateBalance(account);
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
      $withdrawStatus.textContent = 'Error: Transaction failed';
    }
  });
})();
