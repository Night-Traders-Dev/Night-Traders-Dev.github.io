const bscUrl = 'https://bsc-dataseed.binance.org/';
const maticUrl = 'https://rpc-mainnet.matic.network/';
const bscContract = '0x1234567890123456789012345678901234567890'; // Replace with the actual address of the PolyPen bridge contract on BSC
const maticContract = '0x0987654321098765432109876543210987654321'; // Replace with the actual address of the PolyPen bridge contract on Polygon
const privateKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // Replace with your private key

const bridge = new Bridge(bscUrl, maticUrl, bscContract, maticContract, privateKey);

// Transfer PolyPen tokens from BSC to Polygon
const transferToMaticButton = document.getElementById('transfer-to-matic');
transferToMaticButton.addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  try {
    const txHash = await bridge.transfer_to_matic(amount);
    alert(`Transferred ${amount} PolyPen tokens from BSC to Polygon. Tx hash: ${txHash}`);
  } catch (e) {
    alert(`Error transferring PolyPen tokens from BSC to Polygon: ${e.message}`);
  }
});

// Check PolyPen balance on BSC
const checkBscBalanceButton = document.getElementById('check-bsc-balance');
checkBscBalanceButton.addEventListener('click', async () => {
  try {
    const balance = await bridge.get_balance('BSC');
    alert(`PolyPen balance on BSC: ${balance}`);
  } catch (e) {
    alert(`Error getting PolyPen balance on BSC: ${e.message}`);
  }
});

// Withdraw PolyPen tokens from BSC bridge contract to user wallet
const withdrawBscButton = document.getElementById('withdraw-bsc');
withdrawBscButton.addEventListener('click', async () => {
  const toAddress = document.getElementById('to-address').value;
  const amount = document.getElementById('amount').value;
  try {
    const txHash = await bridge.withdraw_bsc(toAddress, amount);
    alert(`Withdrew ${amount} PolyPen tokens from BSC bridge contract to ${toAddress}. Tx hash: ${txHash}`);
  } catch (e) {
    alert(`Error withdrawing PolyPen tokens from BSC bridge contract: ${e.message}`);
  }
});
