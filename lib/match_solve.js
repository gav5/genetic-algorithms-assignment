import {
  isNull, flatMap, chunk, uniq, concat, take, sortBy, cloneDeep,
  reverse, times, shuffle
} from 'lodash'

import generateBoard from './match_generate'
import fitness from './match_fitness'
import combine from './match_combine'
import mutate from './match_mutate'

const POPULATION_SIZE = 60

const GENERATE_POPULATION = 'Generate Population'
const BREED_POPULATION = 'Breed Population'
const MUTATE_POPULATION = 'Mutate Population'
const DIVERSIFY_POPULATION = 'Diversify Population'

function solve(prev, goal) {
  if (isNull(prev)) {
    return {
      population: generatePopulation(goal),
      generation: 1,
    }
  }

  let pop = prev.population

  pop = diversifiedPopulation(pop)
  pop = breedPopulation(pop)
  pop = mutatedPopulation(pop)
  pop = culledPopulation(pop, goal)

  return {
    population: pop,
    generation: prev.generation+1,
  }

  // switch (prev.name) {
  //   case GENERATE_POPULATION:
  //   case DIVERSIFY_POPULATION:
  //     return breedPopulation(prev, goal)
  //   case BREED_POPULATION:
  //     return mutatePopulation(prev, goal)
  //   case MUTATE_POPULATION:
  //     return diversifyPopulation(prev, goal)
  //   default:
  //     throw new Error(`unknown action: ${prev.name}`)
  // }
}

function generatePopulation(goal) {
  return times(POPULATION_SIZE, () => generateBoard())

  // return {
  //   name: GENERATE_POPULATION,
  //   population: sortedPopulation(pop, goal),
  //   generation: 1,
  // }
}

function breedPopulation(population) {
  return flatMap(chunk(shuffle(population), 2), (parents)=> {
    return [...parents, combine(...parents), combine(...reverse(parents))]
  })

  // return {
  //   name: BREED_POPULATION,
  //   population: take(sortedPopulation(pop, goal), POPULATION_SIZE),
  //   generation: prev.generation + 1,
  // }
}

function mutatedPopulation(population) {
  return flatMap(population, (original)=> {
    const mutated = mutate(original)
    return [original, mutated]
  })
  //
  // return {
  //   name: MUTATE_POPULATION,
  //   population: take(sortedPopulation(pop, goal), POPULATION_SIZE),
  //   generation: prev.generation + 1,
  // }
}

function diversifiedPopulation(population) {
  const immigrants = times(POPULATION_SIZE, () => generateBoard())
  return uniq(concat(population, immigrants))

  // return {
  //   name: DIVERSIFY_POPULATION,
  //   population: take(sortedPopulation(pop, goal), POPULATION_SIZE),
  //   generation: prev.generation + 1,
  // }
}

function culledPopulation(population, goal) {
  return take(sortedPopulation(population, goal), POPULATION_SIZE)
}

function sortedPopulation(population, goal) {
  return sortBy(population, (b)=> -fitness(b, goal))
}

export default solve
