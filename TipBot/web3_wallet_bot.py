import os
import discord
from discord.ext import commands
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# Discord bot settings
BOT_TOKEN = os.getenv("BOT_TOKEN")
PREFIX = "!"

# Web3 settings
INFURA_PROJECT_ID = os.getenv("INFURA_PROJECT_ID")
INFURA_ENDPOINT = f"https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}"
BSC_RPC_URL = os.getenv("BSC_RPC_URL")
POLYGON_RPC_URL = os.getenv("POLYGON_RPC_URL")
POLYPEN_TOKEN_BSC = os.getenv("POLYPEN_TOKEN_BSC")
POLYPEN_TOKEN_POLYGON = os.getenv("POLYPEN_TOKEN_POLYGON")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

eth_web3 = Web3(Web3.HTTPProvider(INFURA_ENDPOINT))
bsc_web3 = Web3(Web3.HTTPProvider(BSC_RPC_URL))
polygon_web3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))

account = eth_web3.eth.account.privateKeyToAccount(PRIVATE_KEY)
my_address = account.address

bot = commands.Bot(command_prefix=PREFIX)

@bot.event
async def on_ready():
    print(f"Bot is ready. Logged in as {bot.user}")

@bot.command()
async def balance(ctx, network: str):
    if network.lower() == "bsc":
        web3 = bsc_web3
        token_address = POLYPEN_TOKEN_BSC
    elif network.lower() == "polygon":
        web3 = polygon_web3
        token_address = POLYPEN_TOKEN_POLYGON
    else:
        await ctx.send("Invalid network. Please use 'bsc' or 'polygon'.")
        return

    contract = web3.eth.contract(address=token_address, abi=ERC20_ABI)
    balance = contract.functions.balanceOf(my_address).call()
    await ctx.send(f"Current balance on {network.capitalize()}: {balance} PolyPen Tokens")

@bot.command()
async def tip(ctx, network: str, user: discord.Member, amount: float, recipient_address: str):
    if not Web3.isAddress(recipient_address):
        await ctx.send("Invalid recipient address.")
        return

    if network.lower() == "bsc":
        web3 = bsc_web3
        token_address = POLYPEN_TOKEN_BSC
    elif network.lower() == "polygon":
        web3 = polygon_web3
        token_address = POLYPEN_TOKEN_POLYGON
    else:
        await ctx.send("Invalid network. Please use 'bsc' or 'polygon'.")
       
        return

    contract = web3.eth.contract(address=token_address, abi=ERC20_ABI)
    nonce = web3.eth.getTransactionCount(my_address)

    amount_in_wei = int(amount * (10 ** contract.functions.decimals().call()))

    # Prepare the transaction
    tx = {
        'to': token_address,
        'value': 0,
        'gas': 60000,
        'gasPrice': web3.eth.gasPrice,
        'nonce': nonce,
        'data': contract.functions.transfer(recipient_address, amount_in_wei).buildTransaction()['data']
    }

    # Sign the transaction
    signed_tx = web3.eth.account.signTransaction(tx, PRIVATE_KEY)

    # Send the transaction
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    await ctx.send(f"Sent {amount} PolyPen Tokens to {user.name} ({recipient_address}). Transaction hash: {tx_hash.hex()}")

bot.run(BOT_TOKEN)

