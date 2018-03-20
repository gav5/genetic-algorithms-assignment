import { map } from 'lodash'
import validate from './match_validate'

function combine(a, b) {
  if (b === undefined) {
    return a
  }
  return validate(map(a, (aCh, index)=>
    (index % 2 === 0) ? aCh : b[index]
  ).join(''))
}

export default combine
