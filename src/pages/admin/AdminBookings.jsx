import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";

const AdminBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    api.getAllReservations(token).then(setBookings).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await api.deleteReservation(id, token);
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">All Bookings</h3>
        <div className="text-end">
          <div className="text-muted small">Total Reservations</div>
          <div className="fw-bold fs-5">{bookings.length} · ${totalRevenue} revenue</div>
        </div>
      </div>

      {loading ? (
        <div className="spinner-border text-danger"></div>
      ) : bookings.length === 0 ? (
        <p className="text-muted">No bookings yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Listing</th>
                <th>Location</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Booked On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.userName}</td>
                  <td>{b.listingTitle}</td>
                  <td>{b.location}</td>
                  <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(b.checkOut).toLocaleDateString()}</td>
                  <td>{b.adults + b.children}</td>
                  <td>{b.nights}</td>
                  <td>${b.total}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
