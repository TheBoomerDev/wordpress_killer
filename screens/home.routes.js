const express = require('express')
const router  = express.Router()

const legal    = require('./legal.controller')
const home     = require('./home.controller')
const category = require('./category.controller')
const page     = require('./page.controller')

router.get('/policy', legal.getLegal)
router.get('/terms',  legal.getTerms)

router.get('/categorias',      category.getList)
router.get('/categoria/:slug', category.getDetails)

router.get('/:slug',           page.getDetails)
router.get('/',                home.getHome)

router.use('/admin',  require('./admin/routes') )

module.exports = router;