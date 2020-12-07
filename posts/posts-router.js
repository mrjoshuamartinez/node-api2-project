const app = require('express');
const db = require('../data/db');

const router = app.Router();

// POST | /api/posts
router.post("/", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
        error: "Please provide title for the post."
    })
  }
  if (!req.body.contents) {
    return res.status(400).json({
        error: "Please provide content for the post."
    })
  }
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
        error: "Please provide title and content for the post."
    })
  }
  db.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            error: "There was an error while saving the post to the database."
        })
    })
})

// POST | /api/posts/:id/comments
router.post("/api/posts/:id/comments", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
        error: "Please provide text for comment."
    })
  }
  db.insertComment(req.params.id)
    .then((comments) => {
      if (!req.id === res.id) {
        return res.status(404).json({
          message: "The post with this specified ID does not exist."
        })
      }
      res.status(200).json(comments)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
          error: "There was an error while saving the comment."
      })
    })
})

// GET | /api/posts
router.get("/", (req, res) => {
  db.find()
      .then((posts) => {
              res.status(200).json(posts)
      })
      .catch((err) => {
          res.status(500).json({
              error: "The posts information could not be retrieved."
          })
      })
})

// GET | /api/posts/:id
router.get("/:id/", (req, res) => {
  db.findById(req.params.id)
      .then((post) => {
          if (post.id) {
              res.status(200).json(post)
          } else {
              res.status(404).json({
                  message: "The post with this specified ID does not exist."
              })
          }
      })
      .catch((err) => {
          res.status(500).json({
              error: "The post information could not be retrieved."
          })
      })
})

// GET | /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  db.findPostComments(req.params.id)
      .then((post) => {
          if (post.id) {
              res.status(200).json(post)
          } else {
              res.status(404).json({
                  message: "The post comments with this specified ID does not exist."
              })
          }
      })
      .catch((err) => {
          res.status(500).json({
              error: "The post information could not be retrieved."
          })
      })
})

// DELETE | /api/posts/:id/
router.delete("/:id/", (req, res) => {
  db.remove(req.params.id)
      .then((post) => {
          if (post) {
              res.status(200).json(
                {
                  message: `Post w/ ID "${ req.params.id }" was removed.`
                }
              )
          } else {
              res.status(404).json({
                  message: "The post with this specified ID does not exist."
              })
          }
      })
      .catch((err) => {
          res.status(500).json({
              error: "The post could not be removed."
          })
      })
})

// PUT | /api/posts/:id/
router.put("/api/posts/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: "Please provide text for comment."
    })
  }
  if (!req.body.title) {
    return res.status(400).json({
        error: "Please provide title for the post."
    })
  }
  if (!req.body.contents) {
    return res.status(400).json({
        error: "Please provide content for the post."
    })
  }
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
        error: "Please provide title and content for the post."
    })
  }
  db.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(req.body)
      } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch((err) => {
        res.status(500).json({
            error: "The post information could not be modified."
        })
    })
})

module.exports = router