import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getTicket,
  getComments,
  addComment
} from "../services/api";

function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    loadTicket();
    loadComments();
  }, [id]);

  const loadTicket = async () => {
    try {
      const data = await getTicket(id);

      setTicket(data.ticket || data);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadComments = async () => {
    try {
      const data = await getComments(id);

      setComments(
        Array.isArray(data)
          ? data
          : data.comments || []
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      await addComment(id, comment);

      setComment("");

      await loadComments();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!ticket && !error) {
    return <p>Loading ticket...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>Ticket Details</h1>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {ticket && (
            <div className="ticket-detail">

              <h2>{ticket.subject}</h2>

              <p>{ticket.description}</p>

              <p>
                <strong>Status:</strong>{" "}
                {ticket.status}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {ticket.priority}
              </p>

            </div>
          )}

          <hr />

          <h2>Conversation</h2>

          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((item) => (
              <div
                className="comment"
                key={item.id}
              >
                <strong>
                  {item.name || item.user_name}
                </strong>

                <p>{item.comment}</p>
              </div>
            ))
          )}

          <form onSubmit={handleComment}>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write a comment..."
              rows="4"
            />

            <button type="submit">
              Add Comment
            </button>

          </form>

        </main>

      </div>
    </>
  );
}

export default TicketDetails;