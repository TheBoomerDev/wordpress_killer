const express = require('express')
const router  = express.Router()

router.use('/categories', require('./category.routes') )
router.use('/pages',      require('./pages.routes') )

module.exports = router;