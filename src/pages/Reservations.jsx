import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";

const Reservations = () => {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getUserReservations(token)
      .then(setReservations)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3 className="fw-bold mb-4">My Reservations</h3>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        )}

        {!loading && reservations.length === 0 && (
          <p className="text-muted">You have no reservations yet.</p>
        )}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Listing</th>
                <th>Location</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Nights</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>{r.listingTitle}</td>
                  <td>{r.location}</td>
                  <td>{new Date(r.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(r.checkOut).toLocaleDateString()}</td>
                  <td>{r.adults + r.children}</td>
                  <td>{r.nights}</td>
                  <td>${r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reservations;
