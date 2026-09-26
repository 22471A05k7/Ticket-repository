const API_URL = "http://localhost:5000/api";

const request = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// AUTH
export const registerUser = async (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const loginUser = async (userData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

// TICKETS
export const getTickets = async () => {
  return request("/tickets");
};

export const getTicket = async (id) => {
  return request(`/tickets/${id}`);
};

export const createTicket = async (ticketData) => {
  return request("/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData)
  });
};

export const updateTicket = async (id, ticketData) => {
  return request(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(ticketData)
  });
};

export const deleteTicket = async (id) => {
  return request(`/tickets/${id}`, {
    method: "DELETE"
  });
};

// COMMENTS
export const getComments = async (ticketId) => {
  return request(`/tickets/${ticketId}/comments`);
};

export const addComment = async (ticketId, comment) => {
  return request(`/tickets/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      comment
    })
  });
};