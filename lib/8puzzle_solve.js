import {
  map, range, sortBy, chunk, first, last, cloneDeep, take, concat, flatMap,
  uniq, reverse
} from 'lodash'

import generateBoard from './8puzzle_generate'
import fitness from './8puzzle_fitness'
import combine from './8puzzle_combine'
import mutate from './8puzzle_mutate'
import goalVal from './8puzzle_goal'

const POPULATION_SIZE = 20

const GENERATE_POPULATION = 'Generate Population'
const BREED_POPULATION = 'Breed Population'
const MUTATE_POPULATION = 'Mutate Population'
const DIVERSIFY_POPULATION = 'Diversify Population'

function solve(prev) {
  if (prev === null) {
    return generatePopulation()
  }
  switch (prev.name) {
    case GENERATE_POPULATION:
    case DIVERSIFY_POPULATION:
      return breedPopulation(prev)
    case BREED_POPULATION:
      return mutatePopulation(prev)
    case MUTATE_POPULATION:
      return diversifyPopulation(prev)
    default:
      throw new Error(`unknown action: ${prev.name}`)
  }
}

function generatePopulation() {
  const pop = map(range(POPULATION_SIZE), () => generateBoard())

  return {
    name: GENERATE_POPULATION,
    population: sortedPopulation(pop),
    generation: 1,
  }
}

function breedPopulation(prev) {
  const pop = flatMap(chunk(culledPopulation(prev.population), 2), (parents)=> {
    return [...parents, combine(...parents), combine(...reverse(parents))]
  })

  return {
    name: BREED_POPULATION,
    population: sortedPopulation(pop),
    generation: prev.generation + 1,
  }
}

function mutatePopulation(prev) {
  const pop = flatMap(culledPopulation(prev.population), (original)=> {
    const mutated = mutate(original)
    return [original, mutated]
  })

  return {
    name: MUTATE_POPULATION,
    population: sortedPopulation(pop),
    generation: prev.generation + 1,
  }
}

function diversifyPopulation(prev) {
  const immigrants = map(range(POPULATION_SIZE), () => generateBoard())
  const pop = uniq(concat(prev.population, immigrants))

  return {
    name: DIVERSIFY_POPULATION,
    population: take(sortedPopulation(pop), POPULATION_SIZE),
    generation: prev.generation + 1,
  }
}

function sortedPopulation(population) {
  return sortBy(population, (b)=> -fitness(b))
}

function culledPopulation(population) {
  // return a new population based on the previous with half of them removed
  // (this only takes the most well-suited; it's assumed they're presorted)
  return take(cloneDeep(population), POPULATION_SIZE/2)
}

export default solve
