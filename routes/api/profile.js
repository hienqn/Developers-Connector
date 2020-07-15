const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const {body, validationResult} = require('express-validator');
const { route } = require('./auth');
const user = require('../../models/user');

// @route       GET api/profile/me
// @desc        Get current user profile
// @access      Private 
router.get('/me', auth, async (req, res) => {
    try {
        console.log(req.headers);
        const profile = (await Profile.findOne({user: req.user.id}).populate('user',
            ['name', 'avatar'])
        );

        if (!profile) {
            return res.status(400).json({msg: 'No profile for this user'});
        }

        res.status(200).json(profile);
    }   
    catch(error) {
        console.log({error: error});
    }
});


// @route       Post api/profile/me
// @desc        Create or update a user profile
// @access      Private

router.post('/me',
    [   
        auth,
        [
            body('status', 'Status is required')
                .notEmpty(),
            body('skills', 'Skills is required')
                .notEmpty()
        ]
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skills => skills.trim());
        }
        
        // build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({user : req.user.id});
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                )
                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

// @route       GET api/profile
// @desc        Get all profiles
// @access      Private 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route       GET api/profile/user/:user_id
// @desc        Get all profiles
// @access      Private 
router.get('/user/:user_id', async (req, res) => {
    try {
        console.log(req.params);
        const profiles = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(400).json({ msg: 'Profile not found'});
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
})

// @route DELETE api/profile
// @desc DELETE profile, user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
    try {
        // @to do: remove user's post
        // Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findByIdAndRemove({_id: req.user.id});
        res.json({
            msg: 'User deleted'
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


// @route PUT api/profile/experience
// @desc ADD profile experience
// @access Private

router.put('/experience', auth, async (req, res) => {
    try {
        let doc = await Profile.findOneAndUpdate(
            {user: req.user.id}, 
            {experience: req.body},
            {new: true}
        )
        console.log(doc);
        res.status(200).send('Get experience successfully');
    } catch(err) {
        res.status(400).send(err);
    }
})


module.exports = router;