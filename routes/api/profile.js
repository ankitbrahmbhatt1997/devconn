const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../Models/User");
const Profile = require("../../Models/Profile");
const validateProfileInput = require("../../validation/profile");
const validateEducationInput = require("../../validation/education");
const validateExperienceInput = require("../../validation/experience");
const { searchUserInArray } = require("../../utils/postUtils");
const { addUserInArray } = require("../../utils/postUtils");
const { deleteUserInArray } = require("../../utils/postUtils");

//<--------------------------------------------ROUTES START-------------------------------------------------------->

//@route  GET /api/profile
//@fnc    get the current user profile
//@access protected

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar", "followers", "following"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile has been created Yet";
          return res.status(400).json({ errors });
        }
        return res.json(profile);
      })
      .catch(e => console.log(e));
  }
);
//<-------------------------------------------------------------------------------------------------------------->

// @route   GET api/profile/handle/:handle
// @desc    Get a profile through handle
// @access  public

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar", "followers", "following"])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noProfile = "No profile present for the given handle";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   GET api/profile/userId/:user_id
// @desc    Get a profile through userId
// @access  public

router.get("/userId/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar", "followers", "following"])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noProfile = "No profile present for the given user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   GET api/profile/all
// @desc    Fetching all the profiles in an array
// @access  public

router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar", "followers", "following"])
    .then(profiles => {
      const errors = {};
      if (!profiles) {
        errors.noProfile = "No profiles present";
        return res.status(404).json({ errors });
      }
      return res.json(profiles);
    })
    .catch(e => {
      return res.status(500).json({ e });
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json({ errors });
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json({ errors });
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json({ errors });
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json({ errors });
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json({ err }));
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/profile/addconnections
// @desc    update followers and followings
// @access  Private

router.post(
  "/addconnections",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .then(user => {
        console.log(searchUserInArray(user.following, req.body.targetId));
        if (searchUserInArray(user.following, req.body.targetId)) {
          res.status(400).json({ following: "already following" });
        } else {
          addUserInArray(user.following, req.body.targetId).then(
            newFollowingArray => {
              user.following = newFollowingArray;
              user
                .save()
                .then(savedUser => {
                  return User.findOne({ _id: req.body.targetId });
                })
                .then(targetUser => {
                  if (searchUserInArray(targetUser.followers, req.user.id)) {
                    res.status(400).json({ followers: "already a follower" });
                  } else {
                    const newFollowerArray = addUserInArray(
                      targetUser.followers,
                      req.user.id
                    )
                      .then(newFollowerArray => {
                        targetUser.followers = newFollowerArray;
                        return targetUser.save();
                      })
                      .then(newTargetUser => {
                        return Profile.findOne({
                          user: targetUser._id
                        }).populate("user", [
                          "name",
                          "avatar",
                          "followers",
                          "following"
                        ]);
                      })
                      .then(updatedProfile => {
                        res.json(updatedProfile);
                      });
                  }
                });
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/profile/removeconnections
// @desc    update followers and followings
// @access  Private

router.post(
  "/removeconnections",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .then(user => {
        if (!searchUserInArray(user.following, req.body.targetId)) {
          res.status(400).json({ following: "Not Following" });
        } else {
          deleteUserInArray(user.following, req.body.targetId).then(
            newFollowingArray => {
              user.following = newFollowingArray;
              user
                .save()
                .then(savedUser => {
                  return User.findOne({ _id: req.body.targetId });
                })
                .then(targetUser => {
                  if (!searchUserInArray(targetUser.followers, req.user.id)) {
                    res.status(400).json({ followers: "Not a follower" });
                  } else {
                    const newFollowerArray = deleteUserInArray(
                      targetUser.followers,
                      req.user.id
                    )
                      .then(newFollowerArray => {
                        targetUser.followers = newFollowerArray;
                        return targetUser.save();
                      })
                      .then(newTargetUser => {
                        return Profile.findOne({
                          user: targetUser._id
                        }).populate("user", [
                          "name",
                          "avatar",
                          "followers",
                          "following"
                        ]);
                      })
                      .then(updatedProfile => {
                        res.json(updatedProfile);
                      });
                  }
                });
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

module.exports = router;
