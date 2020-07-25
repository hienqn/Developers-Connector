const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const {body, validationResult, check} = require('express-validator');
const { route } = require('./auth');
const user = require('../../models/user');

// @route       GET api/profile/me
// @desc        Get current user profile
// @access      Private 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = (await Profile.findOne({user: req.user.id}).populate('user',
            ['name', 'avatar', 'email'])
        );
        if (!profile) {
            return res.status(400).json({msg: 'No profile for this user'});
        }

        res.status(200).json(profile);
    }   
    catch(error) {
        res.status(400)({error: error});
    }
});


// @route       Post api/profile/me
// @desc        Create or update a user profile
// @access      Private
router.post('/me',
    [   
        auth,
        [
            check('status', 'Status is required')
                .notEmpty(),
            check('skills', 'Skills is required')
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
        res.status(500).send('Server Error');
    }
})


// @route       GET api/profile/user/:user_id
// @desc        Get user profile using user_id
// @access      Private 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profiles = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(400).json({ msg: 'Profile not found'});
        res.json(profiles);
    } catch (err) {
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
router.put('/experience', 
    [ 
        auth,
        [
            check('title', 'Title is required.')
                .notEmpty(),
            check('company', 'Company is required')
                .notEmpty(),
            check('from', 'From date is required')
                .notEmpty()
        ] 
    ],
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const { title, 
                company, 
                location, 
                from, 
                to, 
                current, 
                description } = req.body;

        const Xexperience = {title, company, location, from, to, current, description};

        try {  
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(Xexperience);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
})

// @route DELETE api/profile/experience/:exp_id
// @desc ADD profile experience
// @access Private
router.delete('/experience', auth, async (req, res) => {
    try {
        const exp_id = req.query.exp_id;
        const profile = await Profile.findOne({id: req.params.exp_id});
        profile.experience.forEach(
            (e, i) => {
                if (e.id === exp_id){
                    profile.experience.splice(i, 1);
                }
            }
        )
        await profile.save();
        return res.status(200).json(profile);
    } catch(err) {
        return res.status(500).json('Server Error');
    }
}
)


// @route PUT api/profile/education
// @desc ADD profile education
// @access Private
router.put('/education', 
    [
        auth, 
        [
            check('school','School is required.').notEmpty(),
            check('degree', 'Degree is required.').notEmpty(),
            check('fieldofstudy', 'Field of Study is required.').notEmpty(),
            check('from','Date is required.').notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const EDUCATION = { ...req.body };
        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(EDUCATION);
            await profile.save();
            return res.json(profile);
        } catch(errors){
            console.error(errors.message);
            return res.status(500).send('Server Error');
        }
    }
)



// @route PUT api/profile/education
// @desc DELETE profile education
// @access Private
router.delete('/education',
    auth,
    async (req, res) => {
        console.log(3);
        try {
            const edu_id = req.query.edu_id;
            console.log(edu_id);
            const profile = await Profile.findOne({ user: req.user.id });
            for (let i = 0; i < profile.education.length; i++){
                if (profile.education[i].id === edu_id){
                    profile.education.splice(i, 1);
                }
            }
            await profile.save();
            return res.json(profile);
        } catch (errors) {
            console.error(errors.message);
            return res.status(500).send('Server Error');
        }
    }
)

module.exports = router;