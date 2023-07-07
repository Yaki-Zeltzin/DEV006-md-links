const path = require('path')

function isAbsolute(route) {
  return path.isAbsolute(route)
};

module.exports = {
  isAbsolute,
}
