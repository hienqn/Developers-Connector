const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const {validationResult, check } = require('express-validator');
const { route } = require('./users');

// @route       Post api/post
// @desc        Creating and updating a post 
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
router.delete('/:id', auth, async (req, res) => {
  //get the post id
  const post_Id = req.params.id;
  // get the post document
  try {
    const post = await Post.findById(post_Id);
    if (post.user.toString() === req.user.id) {
      await post.remove();
      return res.json('Post Deleted.');
    } else {
      return res.status(401).json('Not authorized.')
    }
  } catch(errors){
    if (errors.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not found.' });
    } else {
      return res.status(500).json('Database Error');
    }
  }
})

// @route       Get api/post
// @desc        Get all posts
// @access      Public 
router.get('/', auth, async (req, res) => {
  try {
    const getPosts = await Post.find({}).sort({ date: -1 });
    return res.json(getPosts)
  } catch (errors) {
    return res.status(500).json('Server Errors');
  }
})

// @route       Get api/post
// @desc        Get post by id
// @access      Public 
router.get('/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const getPostsById = await Post.find({user: userId});
    if (!getPostsById) {
      return res.status(404).json({msg: 'Post is not found.'});
    }
    res.json(getPostsById)
  } catch (errors) {
    if (errors.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not found.' });
    } else {
      return res.status(500).json('Database Error');
    }
  }
})

// @route PUT api/post/like/:id
// @desc Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
  const PostId = req.params.id;
  const user = req.user.id;
  try {
    const getPost = await Post.findById(PostId);
    if (getPost) {
      const alreadyLiked = getPost.likes.some((like) => like.users.toString() === user);
      if (alreadyLiked) {
        return res.status(400).json({msg: 'Already liked'});
      } else {
        getPost.likes.unshift({users: user});
        await getPost.save()
        return res.status(200).json(getPost.likes);
      }
    } else {
      return res.status(404).json({msg: 'Post not found.'})
    }
  } catch(errors){
    if (errors.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    } else {
      return res.status(500).json('Database Error');
    }
  }
})



router.put('/unlike/:id', auth, async (req, res) => {
  const PostId = req.params.id;
  const user = req.user.id;
  try {
    const getPost = await Post.findById(PostId);
    if (getPost) {
      let indexOfLike = 0;
      const alreadyLiked = getPost.likes.filter(
        (like, index) => {
          if (like.users.toString() === user){
            indexOfLike = index;
            return true;
          } else {
            return false;
          }
        }
      ).length > 0;

      if (!alreadyLiked) {
        return res.status(400).json({ msg: 'Have yet been liked.' });
      } else {
        getPost.likes.splice(indexOfLike, 1);
        await getPost.save()
        return res.status(200).json(getPost.likes);
      }
    } else {
      return res.status(404).json({ msg: 'Post not found.' })
    }
  } catch (errors) {
    if (errors.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    } else {
      return res.status(500).json('Database Error');
    }
  }
})


module.exports = router;