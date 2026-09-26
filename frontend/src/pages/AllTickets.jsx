import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getTickets,
  updateTicket
} from "../services/api";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();

      setTickets(
        Array.isArray(data) ? data : data.tickets || []
      );

    } catch (error) {
      setError(error.message);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateTicket(id, {
        status
      });

      loadTickets();

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>All Tickets</h1>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {tickets.map((ticket) => (

            <div
              className="ticket-card"
              key={ticket.id}
            >

              <h3>
                {ticket.subject}
              </h3>

              <p>
                {ticket.description}
              </p>

              <p>
                Priority: <strong>{ticket.priority}</strong>
              </p>

              <p>
                Status: <strong>{ticket.status}</strong>
              </p>

              <select
                value={ticket.status}
                onChange={(e) =>
                  changeStatus(
                    ticket.id,
                    e.target.value
                  )
                }
              >

                <option value="OPEN">
                  Open
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="RESOLVED">
                  Resolved
                </option>

              </select>

              <br />

              <Link to={`/tickets/${ticket.id}`}>
                View Ticket
              </Link>

            </div>

          ))}

        </main>

      </div>
    </>
  );
}

export default AllTickets;