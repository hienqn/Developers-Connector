const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/user');

const router = express.Router();
// @route       GET api/auth
// @desc        Test route
// @access      Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route       GET api/auth
// @desc        Authenticate user & get token
// @access      Public
router.post('/',
  [
    body('email', 'Please include a valid email')
      .isEmail(),
    body('password',
      'Password is required.')
      .exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // user exits
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        },
      );
    } catch (err) {
      return res.status(500).send('server error');
    }
  },
);

module.exports = router;