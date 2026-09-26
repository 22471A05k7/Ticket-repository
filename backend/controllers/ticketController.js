const pool = require("../config/db");

const createTicket = async (req, res) => {
  try {
    const {
      subject,
      description,
      priority
    } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        message: "Subject and description are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO tickets
       (user_id, subject, description, priority)
       VALUES (?, ?, ?, ?)`,
      [
        req.user.id,
        subject,
        description,
        priority || "MEDIUM"
      ]
    );

    res.status(201).json({
      message: "Ticket created successfully",
      ticketId: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const {
      search,
      status,
      priority
    } = req.query;

    let sql = `
      SELECT
        t.id,
        t.subject,
        t.description,
        t.priority,
        t.status,
        t.created_at,
        t.updated_at,
        u.name AS customer_name,
        u.email AS customer_email
      FROM tickets t
      JOIN users u ON t.user_id = u.id
      WHERE 1 = 1
    `;

    const params = [];

    if (req.user.role === "CUSTOMER") {
      sql += " AND t.user_id = ?";
      params.push(req.user.id);
    }

    if (search) {
      sql += `
        AND (
          t.subject LIKE ?
          OR t.description LIKE ?
          OR u.name LIKE ?
          OR u.email LIKE ?
        )
      `;

      const value = `%${search}%`;

      params.push(value, value, value, value);
    }

    if (status) {
      sql += " AND t.status = ?";
      params.push(status);
    }

    if (priority) {
      sql += " AND t.priority = ?";
      params.push(priority);
    }

    sql += " ORDER BY t.created_at DESC";

    const [tickets] = await pool.query(sql, params);

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const [tickets] = await pool.query(
      `SELECT
        t.*,
        u.name AS customer_name,
        u.email AS customer_email
       FROM tickets t
       JOIN users u ON t.user_id = u.id
       WHERE t.id = ?`,
      [id]
    );

    if (tickets.length === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    const ticket = tickets[0];

    if (
      req.user.role === "CUSTOMER" &&
      ticket.user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "You cannot access this ticket"
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      priority,
      assigned_to
    } = req.body;

    if (req.user.role !== "AGENT") {
      return res.status(403).json({
        message: "Only agents can update tickets"
      });
    }

    const [result] = await pool.query(
      `UPDATE tickets
       SET
         status = COALESCE(?, status),
         priority = COALESCE(?, priority),
         assigned_to = COALESCE(?, assigned_to)
       WHERE id = ?`,
      [
        status || null,
        priority || null,
        assigned_to || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json({
      message: "Ticket updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const [tickets] = await pool.query(
      "SELECT user_id FROM tickets WHERE id = ?",
      [id]
    );

    if (tickets.length === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    if (
      req.user.role === "CUSTOMER" &&
      tickets[0].user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "You cannot delete this ticket"
      });
    }

    await pool.query(
      "DELETE FROM tickets WHERE id = ?",
      [id]
    );

    res.json({
      message: "Ticket deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
};