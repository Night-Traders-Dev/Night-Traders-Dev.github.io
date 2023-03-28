#!/bin/bash

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "The 'jq' command-line JSON processor is not installed."
    read -p "Would you like to install it? (y/n): " INSTALL_JQ
    if [[ $INSTALL_JQ == "y" ]]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "Installing jq using Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            brew install jq
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "Installing jq using apt-get..."
            sudo apt-get update
            sudo apt-get install jq
        else
            echo "Unsupported operating system. Please install jq manually."
            exit 1
        fi
    else
        echo "Please install jq manually to proceed."
        exit 1
    fi
fi

# Prompt the user for the necessary information
read -p "Enter your PolygonScan API key: " POLYGONSCAN_API_KEY
read -p "Enter your contract address: " CONTRACT_ADDRESS
read -p "Enter your contract name: " CONTRACT_NAME
read -p "Enter the flattened source code file path: " FLATTENED_SOURCE_FILE
read -p "Enter the compiler version (e.g., v0.8.7+commit.e28d00a7): " COMPILER_VERSION
read -p "Enter optimization used (0 for no optimization, 1 for optimization): " OPTIMIZATION_USED
read -p "Enter the number of optimization runs (e.g., 200): " RUNS
read -p "Enter constructor arguments (if any) in ABI-encoded format: " CONSTRUCTOR_ARGUMENTS

# Encode the contract source code
ENCODED_SOURCE_CODE=$(jq -sRr @uri ${FLATTENED_SOURCE_FILE})

# Prepare the API request URL
VERIFY_URL="https://api.polygonscan.com/api?module=contract&action=verifysourcecode&address=${CONTRACT_ADDRESS}&contractname=${CONTRACT_NAME}&code=${ENCODED_SOURCE_CODE}&compilerversion=${COMPILER_VERSION}&optimizationUsed=${OPTIMIZATION_USED}&runs=${RUNS}&constructorArguements=${CONSTRUCTOR_ARGUMENTS}&apikey=${POLYGONSCAN_API_KEY}"

# Send the API request
response=$(curl -s -X GET ${VERIFY_URL})

# Check if the request was successful
if [[ $response == *"NOTOK"* ]]; then
  echo "Verification failed:"
  echo $response
else
  echo "Verification successful:"
  echo $response
fi
