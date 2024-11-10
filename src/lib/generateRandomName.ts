import genericDogNames from 'dog-names';
import pokemonNames from 'pokemon';
import supervillainNames from 'supervillains';
import superheroNames from 'superheroes';
import shuffle from 'lodash.shuffle';
import stringHash from "string-hash";

export function generateRandomName(breed: string): string {
  const randomNames = [
    pokemonNames.random(),
    supervillainNames.random(),
    superheroNames.random(),
    genericDogNames.allRandom()
  ];

  const index = stringHash(breed) % randomNames.length;

  return shuffle(randomNames)[index];
}
