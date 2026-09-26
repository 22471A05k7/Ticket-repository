import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { createTicket } from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createTicket({
        subject,
        description,
        priority
      });

      alert("Ticket created successfully!");

      navigate("/my-tickets");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Create Ticket</h1>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <form
            className="ticket-form"
            onSubmit={handleSubmit}
          >

            <label>Subject</label>

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter ticket subject"
              required
            />

            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue"
              rows="6"
              required
            />

            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Ticket"}
            </button>

          </form>

        </main>

      </div>
    </>
  );
}

export default CreateTicket;