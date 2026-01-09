const Request = require('../models/request.js');

// ✏️ Update request address
exports.updateRequestAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;

    if (!address || address.trim().length < 6) {
      return res.status(400).json({
        error: 'Address must be at least 6 characters long'
      });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // 🔐 Authorization:
    if (
      request.userId.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Not authorized to edit address' });
    }

    // ✅ Update address safely
    request.displayData.address = address.trim();

    await request.save();

    res.json({
      success: true,
      address: request.displayData.address
    });

  } catch (err) {
    console.error('Update address failed:', err);
    res.status(500).json({ error: 'Server error updating address' });
  }
};
