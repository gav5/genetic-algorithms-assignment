// match_fitness.js
// by Gavin Smith
// CS4242 Assignment 03
import { reduce } from 'lodash'

function fitness(value, goal) {
  const goalAry = goal.split('')
  return reduce(value, (acc, ch, i) => {
    return acc + (ch === goalAry[i] ? 1 : 0)
  }, 0)
}

export default fitness
