const express = require('express')
const router = express.Router()
const caseResponse = require('./data/get-case-overview.json')

// Add your routes here - above the module.exports line
router.get('/case1/:sectionId', (req, res, next) => {
  res.locals.case = caseResponse
  res.locals.pageUrlBase = '/case1/'
  res.locals.section = {
    id: req.params.sectionId
  }
  res.render('case1/index.html')
})

module.exports = router
