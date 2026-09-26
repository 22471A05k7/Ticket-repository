const pool = require("../config/db");

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const [ticket] = await pool.query(
      "SELECT user_id FROM tickets WHERE id = ?",
      [id]
    );

    if (ticket.length === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    if (
      req.user.role === "CUSTOMER" &&
      ticket[0].user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access forbidden"
      });
    }

    const [comments] = await pool.query(
      `SELECT
        c.id,
        c.comment,
        c.created_at,
        u.name,
        u.role
       FROM ticket_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.ticket_id = ?
       ORDER BY c.created_at ASC`,
      [id]
    );

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        message: "Comment is required"
      });
    }

    const [ticket] = await pool.query(
      "SELECT user_id FROM tickets WHERE id = ?",
      [id]
    );

    if (ticket.length === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    if (
      req.user.role === "CUSTOMER" &&
      ticket[0].user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access forbidden"
      });
    }

    await pool.query(
      `INSERT INTO ticket_comments
       (ticket_id, user_id, comment)
       VALUES (?, ?, ?)`,
      [
        id,
        req.user.id,
        comment
      ]
    );

    res.status(201).json({
      message: "Comment added successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getComments,
  addComment
};