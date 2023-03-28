#!/bin/bash

# Set the number of NFTs and output directory
NUM_NFTS=5000
OUTPUT_DIR="CM2-metadata"

# Create the output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Set the image URL
IMAGE_URL="https://polypenthouse.com/ClimateMint/1.png"

# Loop through the range of NFTs
for i in $(seq 0 $(($NUM_NFTS-1))); do
  # Create the metadata JSON content
  METADATA=$(cat <<-END
{
  "name": "Penthouse Climate Module #$i",
  "description": "A unique NFT representing penthouse climate module #$i",
  "image": "$IMAGE_URL",
  "attributes": [
    {
      "trait_type": "Uses",
      "value": "3"
    }
  ]
}
END
)

  # Save the metadata JSON to a file
  echo "$METADATA" > $OUTPUT_DIR/$i.json
done

echo "Generated $NUM_NFTS metadata files in the '$OUTPUT_DIR' directory."
