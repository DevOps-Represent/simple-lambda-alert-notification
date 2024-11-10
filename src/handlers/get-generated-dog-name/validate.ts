import { dogBreeds } from "@src/data";

export function validateDogBreed(breed) {
  if (!dogBreeds.some((x) => x === breed)) {
    throw new Error("Breed provided is not valid");
  }
}