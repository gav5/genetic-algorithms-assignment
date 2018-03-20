// match_solve.js
// by Gavin Smith
// CS4242 Assignment 03
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
}

function generatePopulation(goal) {
  return times(POPULATION_SIZE, () => generateBoard())
}

function breedPopulation(population) {
  return flatMap(chunk(shuffle(population), 2), (parents)=> {
    return [...parents, combine(...parents), combine(...reverse(parents))]
  })
}

function mutatedPopulation(population) {
  return flatMap(population, (original)=> {
    const mutated = mutate(original)
    return [original, mutated]
  })
}

function diversifiedPopulation(population) {
  const immigrants = times(POPULATION_SIZE, () => generateBoard())
  return uniq(concat(population, immigrants))
}

function culledPopulation(population, goal) {
  return take(sortedPopulation(population, goal), POPULATION_SIZE)
}

function sortedPopulation(population, goal) {
  return sortBy(population, (b)=> -fitness(b, goal))
}

export default solve
