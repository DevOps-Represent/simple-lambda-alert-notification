#! /bin/bash

breeds=$(cat src/lib/dog-breed.json | jq -c '.[]')

for breed in $breeds; do 
    echo "Inserting ${breed}"
    aws dynamodb put-item --table-name grad-test --item "{\"DogBreed\":{\"S\":${breed}}}"
done

