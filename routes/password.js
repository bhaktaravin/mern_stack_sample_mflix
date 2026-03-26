const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/password/forgot
router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const user = await db.collection('users').findOne({ email });
    // Always return success to avoid email enumeration
    if (!user) return res.json({ message: 'If that email exists, a reset link has been sent.' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await db.collection('users').updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpiry: expiry } }
    );

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the link below to reset your password. It expires in 1 hour.</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });

    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await client.close();
  }
});

// POST /api/password/reset
router.post('/reset', async (req, res) => {
  const { token, password } = req.body;
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const user = await db.collection('users').findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });

    const hash = await bcrypt.hash(password, 10);
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { password: hash }, $unset: { resetToken: '', resetTokenExpiry: '' } }
    );

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
