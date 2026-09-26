import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getTickets } from "../services/api";

function MyTickets() {
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

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>My Tickets</h1>

          {error && (
            <p className="error">{error}</p>
          )}

          {tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <div className="ticket-list">

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
                    <strong>Status:</strong>{" "}
                    {ticket.status}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {ticket.priority}
                  </p>

                  <Link to={`/tickets/${ticket.id}`}>
                    View Details
                  </Link>

                </div>

              ))}

            </div>
          )}

        </main>

      </div>
    </>
  );
}

export default MyTickets;