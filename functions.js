const path = require('path')

function isAbsolute (route) {
  return path.isAbsolute(route)
};

function relativeToAbsolute (route) {
  return path.resolve(route)
}

module.exports = {
  isAbsolute,
  relativeToAbsolute,
}
