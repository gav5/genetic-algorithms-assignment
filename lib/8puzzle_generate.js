// 8puzzle_generate.js
// by Gavin Smith
// CS4242 Assignment 03
import { shuffle } from 'lodash'
import goal from './8puzzle_goal'

function generate() {
  return shuffle(goal).join('')
}

export default generate
