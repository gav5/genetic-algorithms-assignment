// match_mutate.js
// by Gavin Smith
// CS4242 Assignment 03
import { range, sampleSize } from 'lodash'
import validate from './match_validate'

function mutate(value) {
  // randomly pick two indicies and swap them
  const [indexOne, indexTwo] = sampleSize(range(10), 2)
  let _valueAry = value.split('')
  const valOne = _valueAry[indexOne], valTwo = _valueAry[indexTwo]
  _valueAry[indexOne] = valTwo
  _valueAry[indexTwo] = valOne
  return validate(_valueAry.join(''))
}

export default mutate
