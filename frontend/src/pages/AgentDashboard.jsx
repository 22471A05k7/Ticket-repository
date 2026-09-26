import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function AgentDashboard() {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Agent Dashboard</h1>

          <div className="dashboard-cards">

            <div className="card">
              <h3>All Tickets</h3>

              <p>
                View and manage all customer tickets.
              </p>

              <Link to="/all-tickets">
                View Tickets
              </Link>
            </div>

            <div className="card">
              <h3>Customers</h3>

              <p>
                View customer information.
              </p>

              <Link to="/customers">
                Customers
              </Link>
            </div>

            <div className="card">
              <h3>Reports</h3>

              <p>
                View support reports.
              </p>

              <Link to="/reports">
                Reports
              </Link>
            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default AgentDashboard;