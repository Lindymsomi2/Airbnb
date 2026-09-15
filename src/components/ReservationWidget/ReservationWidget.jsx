import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";
import GuestCounter from "../GuestCounter/GuestCounter";

const ReservationWidget = ({ listing }) => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
      : 0;

  const subtotal = listing.price * nights;
  const weeklyDiscount = listing.weeklyDiscount || 0;
  const cleaningFee = listing.cleaningFee || 50;
  const serviceFee = listing.serviceFee || 50;
  const occupancyTaxes = listing.occupancyTaxes || 30;
  const total = subtotal - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxes;

  const handleReserve = async () => {
    setError("");
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      await api.createReservation(
        {
          accommodationId: listing._id || listing.id,
          checkIn,
          checkOut,
          adults: guests.adults,
          children: guests.children,
        },
        token
      );
      setShowSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card border shadow p-4 " >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold">${listing.price} <span className="fw-normal fs-6">/ night</span></span>
          <span>
            <i className="bi bi-star-fill text-warning"></i> {listing.rating} ({listing.reviews})
          </span>
        </div>

        <div className="border rounded-3 mb-3 overflow-hidden">
          <div className="row g-0">
            <div className="col-6 border-end border-bottom p-2">
              <small className="text-muted fw-bold d-block" style={{ fontSize: "10px" }}>CHECK-IN</small>
              <input
                type="date"
                className="form-control border-0 p-0 shadow-none"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="col-6 border-bottom p-2">
              <small className="text-muted fw-bold d-block" style={{ fontSize: "10px" }}>CHECK-OUT</small>
              <input
                type="date"
                className="form-control border-0 p-0 shadow-none"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="col-12 p-2">
              <GuestCounter
                adults={guests.adults}
                children={guests.children}
                onChange={setGuests}
                compact
              />
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <button
          className="btn w-100 py-3 fw-semibold text-white mb-2"
          style={{ background: "#ff385c", border: "none" }}
          onClick={handleReserve}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reserve"}
        </button>
        

        <div className="small">
          <div className="d-flex justify-content-between mb-2">
            <span>${listing.price} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Weekly discount</span>
            <span>-${weeklyDiscount}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Occupancy taxes and fees</span>
            <span>${occupancyTaxes}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log in to continue</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>You need to be logged in to make a reservation.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowLoginModal(false)}>
                  Cancel
                </button>
                <button
                  className="btn text-white"
                  style={{ background: "#ff385c" }}
                  onClick={() => navigate("/login")}
                >
                  Log in or Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">Reservation confirmed!</h5>
                <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
              </div>
              <div className="modal-body text-center">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "48px" }}></i>
                <p className="mt-3">Your reservation has been created successfully.</p>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn text-white w-100"
                  style={{ background: "#ff385c" }}
                  onClick={() => {
                    setShowSuccess(false);
                    navigate("/reservations");
                  }}
                >
                  View my reservations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationWidget;
