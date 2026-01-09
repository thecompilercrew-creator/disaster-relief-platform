const express = require("express");
const Resource = require("../models/resource.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const resources = await Resource.find().populate("userId", "name email");
  res.json(resources);
});

router.post("/", auth, async (req, res) => {
  const resource = await Resource.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(resource);
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const { quantity, location } = req.body;

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // 🔐 Owner check
    if (resource.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (quantity !== undefined) resource.quantity = quantity;
    if (location) resource.location = location;

    await resource.save();
    res.json({ message: 'Resource updated', resource });

  } catch (err) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // 🔐 Only owner can delete
    if (resource.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

module.exports = router;






