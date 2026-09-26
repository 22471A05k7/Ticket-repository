import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return null;
  }

  return (
    <aside className="sidebar">

      {user.role === "CUSTOMER" && (
        <>
          <h3>Customer</h3>

          <Link to="/customer">
            Dashboard
          </Link>

          <Link to="/create-ticket">
            Create Ticket
          </Link>

          <Link to="/my-tickets">
            My Tickets
          </Link>
        </>
      )}

      {user.role === "AGENT" && (
        <>
          <h3>Agent</h3>

          <Link to="/agent">
            Overview
          </Link>

          <Link to="/all-tickets">
            All Tickets
          </Link>

          <Link to="/customers">
            Customers
          </Link>

          <Link to="/reports">
            Reports
          </Link>

          <Link to="/settings">
            Settings
          </Link>
        </>
      )}

    </aside>
  );
}

export default Sidebar;