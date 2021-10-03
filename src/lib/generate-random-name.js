const genericDogNames = require('dog-names');
const pokemonNames = require('pokemon');
const supervillainNames = require('supervillains');
const superheroNames = require('superheroes');
const shuffle = require('lodash.shuffle');
const stringHash = require("string-hash");

function generateRandomName(breed) {
  if (!breed) {
    throw new Error('Breed not provided');
  }

  const randomNames = [
    pokemonNames.random(),
    supervillainNames.random(),
    superheroNames.random(),
    genericDogNames.allRandom()
  ];

  const index = stringHash(breed) % randomNames.length;

  return shuffle(randomNames)[index];
}

module.exports = {
  generateRandomName
}