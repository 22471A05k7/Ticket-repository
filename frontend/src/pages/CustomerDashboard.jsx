import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Customer Dashboard</h1>

          <p>
            Welcome, {user?.name}
          </p>

          <div className="dashboard-cards">

            <div className="card">
              <h3>Create a Ticket</h3>
              <p>Report a problem or request support.</p>

              <Link to="/create-ticket">
                Create Ticket
              </Link>
            </div>

            <div className="card">
              <h3>My Tickets</h3>
              <p>View your support tickets.</p>

              <Link to="/my-tickets">
                View Tickets
              </Link>
            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default CustomerDashboard;