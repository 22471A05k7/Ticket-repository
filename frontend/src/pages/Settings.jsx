import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Settings</h1>

          <div className="card">

            <h3>Account Settings</h3>

            <p>
              Settings page is ready for future configuration.
            </p>

          </div>

        </main>

      </div>
    </>
  );
}

export default Settings;