const express = require('express')
const router  = express.Router()

const ctrl = require('./admin.category.controller')

router.get('/categorias',       ctrl.getList)
router.get('/categoria/:id',    ctrl.getDetails)
router.post('/categoria',       ctrl.create)
router.put('/categoria',        ctrl.edit)
router.delete('/categoria/:id', ctrl.delete)

module.exports = router;