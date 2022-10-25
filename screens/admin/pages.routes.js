const express = require('express')
const router  = express.Router()

const ctrl = require('./admin.pages.controller')

router.get('/',      ctrl.getList)
router.get('/:slug', ctrl.getDetails)
router.post('/',     ctrl.create)
router.put('/',      ctrl.edit)
router.delete('/:id', ctrl.delete)

module.exports = router;