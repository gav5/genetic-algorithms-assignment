// match_generate.js
// by Gavin Smith
// CS4242 Assignment 03
import { sample, times } from 'lodash'

function generate() {
  return times(10, ()=> sample([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ])).join('')
}

export default generate
