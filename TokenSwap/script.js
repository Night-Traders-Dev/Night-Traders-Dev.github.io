const fromToken = document.getElementById("fromToken");
const toToken = document.getElementById("toToken");
const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const swapButton = document.getElementById("swapButton");

// Mock conversion rates
const conversionRates = {
    polyPen: {
        polygon: 2
    },
    polygon: {
        polyPen: 0.5
    }
};

fromToken.addEventListener("change", handleFromTokenChange);
toToken.addEventListener("change", handleToTokenChange);
fromAmount.addEventListener("input", handleFromAmountInput);
swapButton.addEventListener("click", handleSwapButtonClick);

function handleFromTokenChange() {
    if (fromToken.value === toToken.value) {
        toToken.value = fromToken.value === "polyPen" ? "polygon" : "polyPen";
    }
    updateToAmount();
}

function handleToTokenChange() {
    if (fromToken.value === toToken.value) {
        fromToken.value = toToken.value === "polyPen" ? "polygon" : "polyPen";
    }
    updateToAmount();
}

function handleFromAmountInput() {
    updateToAmount();
}

function handleSwapButtonClick() {
    alert(`Swapped ${fromAmount.value} ${fromToken.value} for ${toAmount.value} ${toToken.value}`);
}

function updateToAmount() {
    const fromValue = fromToken.value;
    const toValue = toToken.value;
    const amount = parseFloat(fromAmount.value) || 0;

    toAmount.value = (amount * conversionRates[fromValue][toValue]).toFixed(8);
}

