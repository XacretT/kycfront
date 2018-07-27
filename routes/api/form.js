const express = require('express');
const router = express.Router();

// @route   GET api/form/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg: "Form works"}));

module.exports = router;