p/ Replace these with your actual contract and token addresses
const STAKING_Address = '0x90d0090B38ccEdAEFfDA59C3B1e7EFf18Ec25eFb';

const STAKING_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_erc721TokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_polyPenTokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_rewardRate",
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
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RewardClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Unstaked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "erc721Token",
    "outputs": [
      {
        "internalType": "contract IERC721",
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
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getPendingReward",
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
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "rescueERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "rescueERC721",
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
    "name": "rewardDebts",
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
    "name": "rewardRate",
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
        "internalType": "uint256",
        "name": "_newRewardRate",
        "type": "uint256"
      }
    ],
    "name": "setRewardRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "stake",
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "stakes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


let web3;
let contract;
let account;

const stakedTokenSelect = document.getElementById('staked-token-select');
const rewardAmount = document.getElementById('reward-amount');

const connectButton = document.getElementById('connect-button');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

const toggleNav = () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('show');
};

const connectToMetamask = async () => {
  try {
    await window.ethereum.enable();
    web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    contract = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);
    updateUI();
  } catch (error) {
    console.error(error);
  }
};

const updateUI = async () => {
  // Clear token select options
  tokenSelect.innerHTML = '';
  stakedTokenSelect.innerHTML = '';

  // Get list of ERC-721 tokens owned by the user
  const tokens = await contract.methods.tokensOfOwner(account).call();

  if (tokens.length === 0) {
    // Display message if user does not have any tokens to stake
    tokenSelect.innerHTML = '<option value="" disabled selected>You do not have any tokens to stake</option>';
  } else {
    // Add token select options
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenName = await contract.methods.tokenName(token).call();
      const option = document.createElement('option');
      option.value = token;
      option.innerHTML = tokenName;
      tokenSelect.appendChild(option);
    }
  }

  // Get list of staked tokens owned by the user
  const stakedTokens = await contract.methods.getStakedTokens(account).call();

  if (stakedTokens.length === 0) {
    // Display message if user does not have any staked tokens
    stakedTokenSelect.innerHTML = '<option value="" disabled selected>You do not have any staked tokens</option>';
  } else {
    // Add staked token select options
    for (let i = 0; i < stakedTokens.length; i++) {
      const stakedToken = stakedTokens[i];
      const stakedTokenName = await contract.methods.tokenName(stakedToken).call();
      const option = document.createElement('option');
      option.value = stakedToken;
      option.innerHTML = stakedTokenName;
      stakedTokenSelect.appendChild(option);
    }
  }

  // Get user's reward amount
  const reward = await contract.methods.getReward(account).call();
  rewardAmount.innerHTML = `${reward} POLYPEN`;
};

const stakeTokens = async () => {
  const token = tokenSelect.value;
  const amount = 1; // Change to desired staking amount
  const options = { from: account };
  await contract.methods.stake(token, amount).send(options);
  updateUI();
};

const unstakeTokens = async () => {
  const stakedToken = stakedTokenSelect.value;
  const options = { from: account };
  await contract.methods.unstake(stakedToken).send(options);
  updateUI();
};

const claimReward = async () => {const options = { from: account };
await contract.methods.claimReward().send(options);
updateUI();
};

connectButton.addEventListener('click', connectToMetamask);
document.querySelector('.hamburger').addEventListener('click', toggleNav);
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', toggleNav));
document.getElementById('stake-button').addEventListener('click', stakeTokens);
document.getElementById('unstake-button').addEventListener('click', unstakeTokens);
document.getElementById('claim-reward-button').addEventListener('click', claimReward);

window.addEventListener('load', async () => {
if (window.ethereum) {
web3 = new Web3(window.ethereum);
const accounts = await web3.eth.getAccounts();
if (accounts.length > 0) {
account = accounts[0];
contract = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);
updateUI();
}
} else {
console.error('Please install Metamask');
}
});
