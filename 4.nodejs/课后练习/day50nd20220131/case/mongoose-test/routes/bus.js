const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')


// /api/rest/:resource?query 
// /api/rest/users?query  users => User
// /api/rest/articles?query  articles => Article

//创建资源
router.post('/', async (req, res) => {
  const model = await req.Model.create(req.body)
  res.send(model)
})

//更新资源
// /api/rest/:resource/:id?queryString...
router.put('/:id', async (req, res) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})

//删除资源
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'ok'
  })
})

//查询资源列表
router.get('/', async (req, res) => {
  const queryOPtions = req.body

  const items = await req.Model.find()

  res.send(items)
})

//查询资源详情
router.get('/:id', async (req, res) => {
  const item = await req.Model.findById(req.params.id)

  res.send(item)
})

module.exports = {
  busRoute: router
}