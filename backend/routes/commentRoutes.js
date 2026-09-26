const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
  getComments,
  addComment
} = require("../controllers/commentController");

const router = express.Router();

router.get(
  "/:id/comments",
  authenticate,
  getComments
);

router.post(
  "/:id/comments",
  authenticate,
  addComment
);

module.exports = router;