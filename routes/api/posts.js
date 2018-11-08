const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
const { searchUserInArray } = require("../../utils/postUtils");
const { addUserInArray } = require("../../utils/postUtils");
const { deleteUserInArray } = require("../../utils/postUtils");
//requiring validation
const validatePost = require("../../validation/post");
const validateAnswers = require("../../validation/answers");

//<--------------------------------------------ROUTES START-------------------------------------------------------->

// @route   GET api/posts/all
// @desc    Fetching all the posts in an array
// @access  public

router.get("/all", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      const errors = {};
      if (!posts) {
        errors.noposts = "No posts present";
        return res.status(404).json({ errors });
      }
      return res.json(posts);
    })
    .catch(e => {
      return res.status(500).json({ e });
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   GET api/posts/singlepost/:id
// @desc    Fetching a single post through its id
// @access  public

router.get("/singlepost/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("answers.user", ["name", "avatar"])
    .then(post => {
      const errors = {};
      if (!post) {
        errors.nopost = "No post Found with the given Id";
        return res.status(404).json({ errors });
      }
      return res.json(post);
    })
    .catch(e => {
      return res.status(500).json({ e });
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/post
// @desc    Create a new Post
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const newPost = new Post({
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      text: req.body.text,
      subject: req.body.subject
    });

    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(e => {
        console.log(e);
        res.status(500).json(e);
      });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   DELETE api/posts/delete/:id
// @desc    Deleting a single post through its id
// @access  private

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};
    Post.findById(req.params.id)
      .then(post => {
        if (post) {
          if (post.user.toString() === req.user.id) {
            Post.findOneAndDelete({ _id: post.id })
              .then(result => {
                return res.json({ msg: "Success" });
              })
              .catch(e => console.log(e));
          } else {
            errors.unauthorized = "Not authorized for making changes";
            return res.status(401).json(errors);
          }
        } else {
          errors.notFound = "Post not found";
          return res.status(404).json(errors);
        }
      })
      .catch(e => {
        return res.status(500).json(e);
      });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (searchUserInArray(post.dislikes, req.user.id)) {
            deleteUserInArray(post.dislikes, req.user.id).then(newDislikes => {
              addUserInArray(post.likes, req.user.id).then(newLikes => {
                post.likes = newLikes;
                post.dislikes = newDislikes;
                post.save().then(post => res.send(post));
              });
            });
          } else {
            console.log(searchUserInArray(post.likes, req.user.id));
            if (searchUserInArray(post.likes, req.user.id)) {

              return res
                .status(400)
                .json({ alreadyLiked: "Post is already liked by the user" });
            } else {
              addUserInArray(post.likes, req.user.id).then(newLikes => {
                post.likes = newLikes;
                post.save().then(post => res.send(post));
              });
            }
          }
        })
        .catch(err => {


          res.status(404).json({ postnotfound: "No post found" })
        }
        );
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (searchUserInArray(post.likes, req.user.id)) {
            deleteUserInArray(post.likes, req.user.id).then(newLikes => {
              addUserInArray(post.dislikes, req.user.id).then(newDislikes => {
                post.likes = newLikes;
                post.dislikes = newDislikes;
                post.save().then(post => res.send(post));
              });
            });
          } else {
            if (searchUserInArray(post.dislikes, req.user.id)) {
              res.status(400).json({
                alreadyDisliked: "Post is already disliked by the user"
              });
            } else {
              addUserInArray(post.dislikes, req.user.id).then(newDislikes => {
                post.dislikes = newDislikes;
                post.save().then(post => res.send(post));
              });
            }
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/posts/answer/:id
// @desc    Add answer to post
// @access  Private

router.post(
  "/answer/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAnswers(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json({ errors });
    }
    console.log(req.params.id);
    Post.findOne({ _id: req.params.id })
      .populate("answers.user", ["name", "avatar"])
      .then(post => {
        const newAnswer = {
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.answers.unshift(newAnswer);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ postnotfound: "No post found" });
      });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//<-----------------------------------------ROUTES ENDS HERE-------------------------------------------------------->

module.exports = router;
