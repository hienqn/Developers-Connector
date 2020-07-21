const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const {validationResult, check } = require('express-validator');

// @route       Post api/post
// @desc        Making a post 
// @access      Public 
router.post('/',
  // Sanitize data.
  [ 
      // Get user.id from auth.
      auth,
      [
        // Check if text is empty.
        check('text', 'Text must be provided.').notEmpty(),
      ]
  ], 
  async (req, res) => {
      // Check if there is any errors in previous sanitize middleware.
      const checkErrors = validationResult(req);
      // Send an array of error if there is error.
      if (!checkErrors.isEmpty()) {
        return res.json(checkErrors.array());
      }
      try {
        // Get user_id
        const user = req.user.id;
        // Get document that has user_id
        const findUser = await User.findById(user);
        // Get name, avatar of the user.
        const name = findUser.name, 
              avatar = findUser.avatar;
        // Get text from the req.body after sanitizing. 
        const {text} = req.body;
        
        // Save document after done extracting name, and avatar infos.
        findUser.save();

        // Creating newPost with text, user, name, and avatar, and save. 
        const newPost = await new Post({user, text, name, avatar});
        newPost.save();

        // Finish sanitizing and creating new post. Send back this new Post. 
        res.json(newPost);
      } catch(errors){
        console.log(errors);
        if (errors.kind === 'ObjectId'){
          res.status(400).json('User does not exist');
        } else {
          res.status(500).json('Database Error');
        }
      }
  }
);

// @route       Delete api/post
// @desc        Deleting a post
// @access      Public 
// info needed to delete: post_id;
module.exports = router;