// match_validate.js
// by Gavin Smith
// CS4242 Assignment 03
function validate(value) {
  if (value.length !== 10) {
    throw new Error(`value must be of length 10: ${value}`)
  }
  if (!/[A-Z]{10}/.test(value)) {
    throw new Error(`value must be of correct format: ${value}`)
  }
  return value
}

export default validate
