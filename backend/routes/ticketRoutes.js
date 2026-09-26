const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", authenticate, getTickets);

router.post("/", authenticate, createTicket);

router.get("/:id", authenticate, getTicketById);

router.put("/:id", authenticate, updateTicket);

router.delete("/:id", authenticate, deleteTicket);

module.exports = router;