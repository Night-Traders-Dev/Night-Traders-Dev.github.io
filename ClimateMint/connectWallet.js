import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import QRCodeModal from '@walletconnect/qrcode-modal';

async function connectWallet() {
  if (window.ethereum) {
    // MetaMask or any browser extension wallet that injects window.ethereum
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    console.log('Connected address:', accounts[0]);
  } else {
    // WalletConnect for mobile wallets
    const provider = new WalletConnectProvider({
      rpc: {
        1: 'https://mainnet.infura.io/v3/f54180f0d4bd4646b1a70610d985525f',
      },
      qrcodeModal: QRCodeModal,
    });

    try {
      await provider.enable();

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      console.log('Connected address:', accounts[0]);

      // Subscribe to session disconnection
      provider.on('disconnect', (code, reason) => {
        console.log('Disconnected:', code, reason);
      });
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
    }
  }
}

connectWallet();
