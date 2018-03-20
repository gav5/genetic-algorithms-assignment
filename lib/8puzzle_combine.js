// 8puzzle_combine.js
// by Gavin Smith
// CS4242 Assignment 03
import {
  concat, invokeMap, range, times, constant, indexOf, findIndex
} from 'lodash'
import validate from './8puzzle_validate'

function combine(a, b) {
  const needed = concat(invokeMap(range(1,9), 'toString'), '-')
  let result = times(9, constant(''))

  for (let ch of needed) {
    const aIndex = indexOf(a, ch), bIndex = indexOf(b, ch)
    const favoredIndex = (aIndex % 2 === 0) ? aIndex : bIndex
    const lesserIndex = (aIndex % 2 === 1) ? aIndex : bIndex

    if (result[favoredIndex] === '') {
      // try with the favored index first!
      result[favoredIndex] = ch
    } else if (result[lesserIndex] === '') {
      // next try the lesser index
      result[lesserIndex] = ch
    } else {
      // fallback to the first available index that's not taken
      const firstAvailableIndex = findIndex(result, (x)=> x === '')
      result[firstAvailableIndex] = ch
    }
  }
  return validate(result.join(''))
}

export default combine
