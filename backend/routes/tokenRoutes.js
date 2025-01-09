const express = require('express')
const { generateToken, validateToken, getTokenHistory } = require('../controllers/tokenController')
const router = express.Router()

router.post('/generate-token', generateToken)
router.post('/validate-token', validateToken)
router.get('/get-token-history', getTokenHistory)

module.exports = router