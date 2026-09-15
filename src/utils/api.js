const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const getHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const api = {
  login: (email, password) =>
    fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  register: (username, email, password) =>
    fetch(`${API_BASE}/users/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, email, password }),
    }).then(handleResponse),

  getAccommodations: (locationSlug) => {
    const query = locationSlug ? `?locationSlug=${locationSlug}` : "";
    return fetch(`${API_BASE}/accommodations${query}`).then(handleResponse);
  },

  getAccommodation: (id) =>
    fetch(`${API_BASE}/accommodations/${id}`).then(handleResponse),

  createAccommodation: (data, token) =>
    fetch(`${API_BASE}/accommodations`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    }).then(handleResponse),

  updateAccommodation: (id, data, token) =>
    fetch(`${API_BASE}/accommodations/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    }).then(handleResponse),

  deleteAccommodation: (id, token) =>
    fetch(`${API_BASE}/accommodations/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    }).then(handleResponse),

  createReservation: (data, token) =>
    fetch(`${API_BASE}/reservations`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    }).then(handleResponse),

  getUserReservations: (token) =>
    fetch(`${API_BASE}/reservations/user`, {
      headers: getHeaders(token),
    }).then(handleResponse),

  getAllReservations: (token) =>
    fetch(`${API_BASE}/reservations/all`, {
      headers: getHeaders(token),
    }).then(handleResponse),

  deleteReservation: (id, token) =>
    fetch(`${API_BASE}/reservations/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    }).then(handleResponse),
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const LOCATIONS = [
  { slug: "all", label: "All Locations" },
  { slug: "new-york", label: "New York" },
  { slug: "paris", label: "Paris" },
  { slug: "tokyo", label: "Tokyo" },
  { slug: "cape-town", label: "Cape Town" },
  { slug: "thailand", label: "Thailand" },
];

export const slugToLabel = (slug) =>
  LOCATIONS.find((l) => l.slug === slug)?.label || slug;
