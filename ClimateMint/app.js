const contractABI = [...] // Replace with the ABI of the PenthouseClimateModule contract
const contractAddress = "{CONTRACT_ADDRESS}"; // Replace with the actual contract address

let web3;
let contract;
let userAddress;

document.getElementById("connectBtn").addEventListener("click", connectMetamask);

async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress = accounts[0];
            contract = new web3.eth.Contract(contractABI, contractAddress);

            document.getElementById("connectBtn").classList.add("hidden");
            document.getElementById("mintSection").classList.remove("hidden");

            document.getElementById("mintBtn").addEventListener("click", mintNFTs);
        } catch (error) {
            console.error("User rejected connection:", error);
        }
    } else {
        alert("Please install Metamask.");
    }
}

async function mintNFTs() {
    const numTokens = document.getElementById("numTokens").value;
    const price = await contract.methods.PRICE().call();
    const totalCost = price * numTokens;

    contract.methods.mint(numTokens).send({ from: userAddress, value: totalCost })
        .on("transactionHash", (hash) => {
            console.log("Transaction Hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
            console.log("Transaction confirmed:", confirmationNumber, receipt);
        })
        .on("error", (error) => {
            console.error("Transaction error:", error);
        });
}
