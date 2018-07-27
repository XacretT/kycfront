const express = require('express');
const router = express.Router();

// @route   GET api/kyc/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg: "KYC works"}));

module.exports = router;