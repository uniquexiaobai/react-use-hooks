
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-use-hooks.cjs.production.min.js')
} else {
  module.exports = require('./react-use-hooks.cjs.development.js')
}
