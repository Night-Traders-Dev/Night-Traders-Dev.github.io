#!/bin/bash

# Set the number of NFTs and output directory
NUM_NFTS=333
OUTPUT_DIR="PolyMetaData"

# Create the output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Set the image URL
IMAGE_URL="https://polypenthouse.com/PolyMetaData/images/{$i}.png"

# Loop through the range of NFTs
for i in $(seq 0 $(($NUM_NFTS-1))); do
  # Create the metadata JSON content
  METADATA=$(cat <<-END
{
  "name": "Penthouse",
  "description": "Poly Penthouse Collection",
  "image": "$IMAGE_URL",
  "attributes": [
    {
      "trait_type": "Climate",
      "value": "????"
    },
    {
      "trait_type": "Locale",
      "value": "????"
    },
    {
      "trait_type": "Resource",
      "value": "????"
    },
    {
      "trait_type": "Resource",
      "value": "?????"
    }
  ]
}

END
)

  # Save the metadata JSON to a file
  echo "$METADATA" > $OUTPUT_DIR/$i.json
done

echo "Generated $NUM_NFTS metadata files in the '$OUTPUT_DIR' directory."
