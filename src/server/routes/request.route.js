const express = require('express');
const router = express.Router();
const { updateRequestAddress } = require('../controllers/request.controller');
const auth = require('../middleware/auth');

// 🔐 Update request address
router.patch('/requests/:id/address', auth, updateRequestAddress);

module.exports = router;
