import { reduce, isEqual } from 'lodash'

function fitness(value) {
  return reduce(value, (acc, ch, i) => {
    const gc = goalCoordinates(ch)
    const cc = currentCoordinates(i)
    return acc + (isEqual(gc, cc) ? 1 : 0)
  }, 0)
}

function goalCoordinates(ch) {
  switch (ch) {
    case '1':
      return {x: 0, y: 0}
    case '2':
      return {x: 1, y: 0}
    case '3':
      return {x: 2, y: 0}
    case '4':
      return {x: 2, y: 1}
    case '5':
      return {x: 2, y: 2}
    case '6':
      return {x: 1, y: 2}
    case '7':
      return {x: 0, y: 2}
    case '8':
      return {x: 0, y: 1}
    case '-':
      return {x: 1, y: 1}
    default:
      return {}
  }
}

function currentCoordinates(i) {
  switch (i) {
    case 0:
      return {x: 0, y: 0}
    case 1:
      return {x: 1, y: 0}
    case 2:
      return {x: 2, y: 0}
    case 3:
      return {x: 0, y: 1}
    case 4:
      return {x: 1, y: 1}
    case 5:
      return {x: 2, y: 1}
    case 6:
      return {x: 0, y: 2}
    case 7:
      return {x: 1, y: 2}
    case 8:
      return {x: 2, y: 2}
    default:
      return {}
  }
}

export default fitness
