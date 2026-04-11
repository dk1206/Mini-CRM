const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const serializeLead = (leadInstance) => {
  const lead = leadInstance.toJSON();
  return {
    ...lead,
    _id: String(lead.id),
  };
};

const pickLeadPayload = (body) => ({
  name: body.name,
  email: body.email,
  phone: body.phone || '',
  source: body.source || 'Website',
  status: body.status || 'new',
  notes: body.notes || '',
});

const leadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Phone must be a valid string'),
  body('source')
    .optional()
    .isIn(['Website', 'LinkedIn', 'Referral', 'Other'])
    .withMessage('Source must be Website, LinkedIn, Referral, or Other'),
  body('status')
    .optional()
    .isIn(['new', 'contacted', 'converted'])
    .withMessage('Status must be new, contacted, or converted'),
  body('notes')
    .optional({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Notes must be a valid string'),
];

router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.json(leads.map(serializeLead));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch leads' });
  }
});

router.post('/', leadValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lead = await Lead.create(pickLeadPayload(req.body));
    return res.status(201).json(serializeLead(lead));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create lead' });
  }
});

router.put('/:id', protect, leadValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.update(pickLeadPayload(req.body));

    return res.json(serializeLead(lead));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update lead' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.destroy();

    return res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete lead' });
  }
});

module.exports = router;
