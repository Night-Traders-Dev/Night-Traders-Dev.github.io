from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account
from eth_account.signers.local import LocalAccount
from eth_typing import URI
from typing import Any, Dict, List

class Bridge:
    def __init__(self, bsc_url: str, matic_url: str, bsc_contract: str, matic_contract: str, private_key: str):
        self.bsc_web3 = Web3(Web3.HTTPProvider(bsc_url))
        self.bsc_web3.middleware_onion.inject(geth_poa_middleware, layer=0)
        self.matic_web3 = Web3(Web3.HTTPProvider(matic_url))
        self.matic_contract = self.matic_web3.eth.contract(address=matic_contract, abi=ABI)
        self.bsc_contract = self.bsc_web3.eth.contract(address=bsc_contract, abi=ABI)
        self.private_key = private_key
        self.admin_account = self.bsc_web3.eth.account.from_key(private_key)

    def transfer_to_bsc(self, amount: int) -> str:
        nonce = self.bsc_web3.eth.getTransactionCount(self.admin_account.address)
        tx = self.matic_contract.functions.transferToBSC(amount).buildTransaction({
            'chainId': 137,
            'gasPrice': self.matic_web3.toWei('10', 'gwei'),
            'nonce': nonce
        })
        signed_tx = self.admin_account.sign_transaction(tx)
        try:
            tx_hash = self.bsc_web3.eth.send_raw_transaction(signed_tx.rawTransaction)
            return Web3.toHex(tx_hash)
        except Exception as e:
            raise ValueError(f'Error transferring PolyPen tokens to BSC: {e}')

    def transfer_to_matic(self, amount: int) -> str:
        nonce = self.matic_web3.eth.getTransactionCount(self.admin_account.address)
        tx = self.bsc_contract.functions.transferToMatic(amount).buildTransaction({
            'chainId': 56,
            'gasPrice': self.bsc_web3.toWei('10', 'gwei'),
            'nonce': nonce
        })
        signed_tx = self.admin_account.sign_transaction(tx)
        try:
            tx_hash = self.matic_web3.eth.send_raw_transaction(signed_tx.rawTransaction)
            return Web3.toHex(tx_hash)
        except Exception as e:
            raise ValueError(f'Error transferring PolyPen tokens to Polygon: {e}')

    def get_balance(self, network: str) -> int:
        if network == 'BSC':
            try:
                balance = self.bsc_contract.functions.balanceOf(self.admin_account.address).call()
                return balance
            except Exception as e:
                raise ValueError(f'Error getting PolyPen balance on BSC: {e}')
        elif network == 'Matic':
            try:
                balance = self.matic_contract.functions.balanceOf(self.admin_account.address).call()
                return balance
            except Exception as e:
                raise ValueError(f'Error getting PolyPen balance on Polygon: {e}')
        else:
            raise ValueError('Invalid network')

    def withdraw_bsc(self, to_address: str, amount: int) -> str:
        nonce = self.bsc_web3.eth.getTransactionCount(self.admin_account.address)
        tx = self.bsc_contract.functions.withdrawBSC(to_address, amount).buildTransaction({
            'chainId': 56,
            'gasPrice': self.bsc_web3.toWei('10', 'gwei'),
            'nonce': nonce
        })
        signed_tx = self.admin_account.sign_transaction(tx)
       
