#!/bin/bash

COLLECTION_SLUG="poly-penthouses"
API_URL="https://api.opensea.io/api/v1"
ASSET_LIMIT=50
OFFSET=0

echo "Fetching collection details for $COLLECTION_SLUG..."
curl -s "$API_URL/collection/$COLLECTION_SLUG" | jq

echo "Fetching assets for the $COLLECTION_SLUG collection..."
while true; do
    ASSET_RESPONSE=$(curl -s "$API_URL/assets?collection=$COLLECTION_SLUG&limit=$ASSET_LIMIT&offset=$OFFSET")
    ASSET_COUNT=$(echo "$ASSET_RESPONSE" | jq '.assets | length')
    echo "$ASSET_RESPONSE" | jq '.assets[] | {name: .name, id: .token_id, permalink: .permalink}'

    if [ "$ASSET_COUNT" -lt "$ASSET_LIMIT" ]; then
        break
    else
        OFFSET=$((OFFSET + ASSET_LIMIT))
    fi
done
