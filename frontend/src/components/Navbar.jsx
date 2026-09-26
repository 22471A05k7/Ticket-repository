import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Support Ticket System</h2>

      <div className="navbar-right">
        {user && (
          <span>
            {user.name} ({user.role})
          </span>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;