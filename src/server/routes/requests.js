const express = require("express");
const Request = require("../models/request.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { status, helpType } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (helpType) filter.helpType = helpType;

  const requests = await Request.find(filter).lean();

  res.json(
    requests.map(r => ({
      ...r,
      volunteerCount: r.volunteers.length,
      isAuthorized: r.volunteers.some(v => v.toString() === req.user.id)
    }))
  );
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

router.patch('/api/requests/:id/address', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;

    if (!address || address.trim() === '') {
      return res.status(400).json({ error: 'Address is required' });
    }

    const request = await Request.findById(id);
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Check authorization - user must be creator or volunteer
    const isCreator = request.userId.toString() === req.userId;
    const isVolunteer = request.volunteers && request.volunteers.some(v => 
      v.toString() === req.userId
    );
    
    if (!isCreator && !isVolunteer) {
      return res.status(403).json({ error: 'Not authorized to edit this request' });
    }

    // Update the address
    if (request.displayData) {
      request.displayData.address = address.trim();
    } else {
      request.displayData = { address: address.trim() };
    }
    
    await request.save();

    res.json({ 
      success: true, 
      message: 'Address updated successfully',
      request 
    });

  } catch (err) {
    console.error('Error updating address:', err);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

module.exports = router;











