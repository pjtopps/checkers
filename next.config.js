const withCSS = require('@zeit/next-css')
const withWorkers = require('@zeit/next-workers')
module.exports = withCSS(withWorkers())
