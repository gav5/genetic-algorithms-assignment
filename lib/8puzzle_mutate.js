import { clone, range, sampleSize } from 'lodash'
import validate from './8puzzle_validate'

function mutate(value) {
  // randomly pick two indicies and swap them
  const [indexOne, indexTwo] = sampleSize(range(9), 2)
  let _valueAry = value.split('')
  const valOne = _valueAry[indexOne], valTwo = _valueAry[indexTwo]
  _valueAry[indexOne] = valTwo
  _valueAry[indexTwo] = valOne
  return validate(_valueAry.join(''))
}
export default mutate
