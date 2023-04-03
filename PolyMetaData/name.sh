#!/bin/bash

for i in {0..333}
do
    old_filename="${i}.json"
    new_filename="${i}"

    if [ -e "${old_filename}" ]
    then
        mv "${old_filename}" "${new_filename}"
        echo "Renamed ${old_filename} to ${new_filename}"
    else
        echo "File ${old_filename} does not exist"
    fi
done
