import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Reports</h1>

          <div className="dashboard-cards">

            <div className="card">
              <h3>Ticket Reports</h3>
              <p>
                Reports and statistics will appear here.
              </p>
            </div>

            <div className="card">
              <h3>Support Activity</h3>
              <p>
                Support activity information.
              </p>
            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Reports;