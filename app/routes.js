const express = require('express')
const router = express.Router()
const caseResponse = require('./data/get-case-overview.json')

// Add your routes here - above the module.exports line
router.get('/case-v2/:sectionId', (req, res, next) => {
  res.locals.case = caseResponse
  res.locals.pageUrlBase = '/case-v2/'
  res.locals.section = {
    id: req.params.sectionId
  }
  res.locals.compact = Boolean(typeof req.query.compact !== 'undefined')
  res.render('case-v2/index.html')
})

module.exports = router
