const inflection = require('inflection')

module.exports = options => {
  return async (req, res, next) => {
    console.log(req)
    const modelName = inflection.classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}