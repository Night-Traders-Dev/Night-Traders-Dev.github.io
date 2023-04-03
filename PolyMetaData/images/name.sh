#!/bin/bash

source_file="0.png"

for i in {1..332}
do
  destination_file="${i}.png"
  cp "${source_file}" "${destination_file}"
done
