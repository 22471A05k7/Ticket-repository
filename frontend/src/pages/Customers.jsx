import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Customers() {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Customers</h1>

          <div className="card">

            <h3>Customer Management</h3>

            <p>
              Customer API will be connected here.
            </p>

          </div>

        </main>

      </div>
    </>
  );
}

export default Customers;