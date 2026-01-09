const express = require("express");
const Request = require("../models/request.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get('/my-volunteers', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const requests = await Request.find({
      'volunteers.userId': userId
    })
    .sort({ createdAt: -1 })
    .lean();

    res.json(requests);
  } catch (err) {
    console.error('My Volunteers Error:', err);
    res.status(500).json([]);
  }
});



router.post("/", auth, async (req, res) => {
  const request = await Request.create({
    helpType: req.body.helpType,
    urgency: req.body.urgency,
    description: req.body.description,
    displayData: req.body,
    createdBy: req.user.id
  });
  res.json(request);
});

module.exports = router;





