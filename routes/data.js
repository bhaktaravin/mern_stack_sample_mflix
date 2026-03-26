const router = require('express').Router();
const auth = require('../middleware/auth');

// GET /api/data — protected route, only accessible when logged in
router.get('/', auth, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, here is your protected data.`, user: req.user });
});

module.exports = router;
