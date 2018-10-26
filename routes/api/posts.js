const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
//requiring validation
const validatePost = require("../../validation/post");

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
        return res.status(404).json(errors);
      }
      return res.json(posts);
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

//<-------------------------------------------------------------------------------------------------------------->

// @route   GET api/posts/singlepost/:id
// @desc    Fetching a single post through its id
// @access  public

router.get("/singlepost/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })

    .then(post => {
      console.log(post);
      const errors = {};
      if (!post) {
        errors.nopost = "No post Found with the given Id";
        return res.status(404).json(errors);
      }
      return res.json(post);
    })
    .catch(e => {
      return res.status(500).json(e);
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
      return res.json(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      avatar: req.body.avatar,
      text: req.body.text
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
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
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
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//<-------------------------------------------------------------------------------------------------------------->

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
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
