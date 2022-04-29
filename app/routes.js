const express = require('express')
const router = express.Router()
const caseResponse = require('./data/get-case-overview.json')

// Add your routes here - above the module.exports line
router.get('/case-v3/:sectionId', (req, res, next) => {
  res.locals.case = caseResponse
  res.locals.pageUrlBase = '/case-v3/'
  res.locals.section = {
    id: req.params.sectionId
  }
  res.locals.compact = Boolean(typeof req.query.compact !== 'undefined')
  res.render('case-v3/index.html')
})

module.exports = router
