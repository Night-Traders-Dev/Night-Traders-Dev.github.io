#!/bin/bash

for i in $(seq 0 9999); do
  if [ -f "${i}.json" ]; then
    mv "${i}.json" "${i}"
  fi
done
