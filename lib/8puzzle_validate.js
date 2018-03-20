// 8puzzle_validate.js
// by Gavin Smith
// CS4242 Assignment 03
import { uniq } from 'lodash'

function validate(value) {
  if (value.length !== 9) {
    throw new Error(`value must be of length 9: ${value}`)
  }
  if (uniq(value).length !== 9) {
    throw new Error(`repeat values should not be present: ${value}`)
  }
  if (!/[1-8\-]{9}/.test(value)) {
    throw new Error(`value must be of correct format: ${value}`)
  }
  return value
}
export default validate
