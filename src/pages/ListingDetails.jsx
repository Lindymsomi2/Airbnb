import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ReservationWidget from "../components/ReservationWidget/ReservationWidget";
import { api } from "../utils/api";

const amenityIcons = {
  wifi: "bi-wifi",
  kitchen: "bi-cup-hot",
  "free parking": "bi-car-front",
  pool: "bi-water",
};

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getAccommodation(id)
      .then(setListing)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status"></div>
        </div>
      </>
    );
  }

  if (error || !listing) {
    return (
      <>
        <Navbar />
        <div className="alert alert-danger m-5">{error || "Listing not found"}</div>
      </>
    );
  }

  const images = listing.images || [];
  const mainImage = images[0];
  const gridImages = images.slice(1, 5);
  const reviews = listing.userReviews || [];
  const ratings = listing.specificRatings || {};

  return (
    <>
      <Navbar />
      <div className="container py-4">
        {/* Title row */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h3 className="fw-bold">{listing.title}</h3>
            <p className="text-muted mb-0">
              <i className="bi bi-star-fill text-warning"></i> {listing.rating} ({listing.reviews} reviews) · {listing.location}
            </p>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-link text-dark text-decoration-none">
              <i className="bi bi-share"></i> Share
            </button>
            <button className="btn btn-link text-dark text-decoration-none">
              <i className="bi bi-heart"></i> Save
            </button>
          </div>
        </div>

        {/* Image gallery */}
        <div className="row g-2 mb-4 rounded-3 overflow-hidden" style={{ height: "400px" }}>
          <div className="col-6">
            <img src={mainImage} alt={listing.title} className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="col-6">
            <div className="row g-2 h-100">
              {gridImages.map((img, i) => (
                <div className="col-6" key={i}>
                  <img src={img} alt="" className="w-100 h-100 object-fit-cover" style={{ height: "196px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          {/* Left column */}
          <div className="col-lg-7">
            <div className="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
              <div>
                <h4 className="fw-bold">{listing.type} hosted by {listing.host}</h4>
                <p className="text-muted">
                  {listing.guests} guests · {listing.type} · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms
                </p>
              </div>
              <div
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                style={{ width: 56, height: 56, fontSize: "20px" }}
              >
                {listing.host?.[0]}
              </div>
            </div>

            
            <div className="border-bottom pb-4 mb-4">
              {[
                { icon: "bi-house-door", title: listing.type, desc: "You'll have the apartment for yourself." },
                listing.enhancedCleaning && { icon: "bi-stars", title: "Enhanced Cleaning", desc: "This Host committed to Airbnb's 5-step enhanced cleaning process." },
                listing.selfCheckIn && { icon: "bi-key", title: "Self Check-in", desc: "Check yourself in with the keypad." },
                { icon: "bi-calendar-check", title: "Cancellation Policy", desc: "Free cancellation before Feb 14." },
              ].filter(Boolean).map((item, i) => (
                <div className="d-flex gap-3 mb-3" key={i}>
                  <i className={`bi ${item.icon} fs-4`}></i>
                  <div>
                    <div className="fw-semibold">{item.title}</div>
                    <div className="text-muted small">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mb-4">{listing.description}</p>

           
            <div className="border-bottom pb-4 mb-4">
              <h5 className="fw-bold mb-3">Where you&apos;ll sleep</h5>
              <div style={{ maxWidth: "200px" }}>
                <img
                  src={listing.bedroomImage || images[0]}
                  alt="Bedroom"
                  className="rounded-3 w-100 mb-2"
                  style={{ height: "140px", objectFit: "cover" }}
                />
                <p className="small mb-0">{listing.bedroomDescription}</p>
                <p className="small text-muted">Total bedrooms: {listing.bedrooms}</p>
              </div>
            </div>

            
            <div className="border-bottom pb-4 mb-4">
              <h5 className="fw-bold mb-3">What this place offers</h5>
              <div className="row">
                {listing.amenities?.map((amenity, i) => (
                  <div className="col-md-6 d-flex align-items-center gap-2 mb-3" key={i}>
                    <i className={`bi ${amenityIcons[amenity.toLowerCase()] || "bi-check-circle"}`}></i>
                    <span className="text-capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-dark mt-2">
                View all {listing.amenities?.length || 0} amenities
              </button>
            </div>

            {/* Calendar placeholder */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="fw-bold">7 nights in {listing.location}</h5>
              <p className="text-muted small">Select dates using the reservation widget</p>
            </div>

            {/* Reviews */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-star-fill text-warning"></i> {listing.rating} · {listing.reviews} reviews
              </h5>
              <div className="row mb-4">
                {Object.entries(ratings).map(([key, val]) => (
                  <div className="col-md-6 mb-2" key={key}>
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="text-capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span>{val}</span>
                    </div>
                    <div className="progress" style={{ height: "4px" }}>
                      <div className="progress-bar bg-dark" style={{ width: `${(val / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                {reviews.slice(0, 6).map((review, i) => (
                  <div className="col-md-6 mb-4" key={i}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{ width: 40, height: 40 }}
                      >
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="fw-semibold small">{review.name}</div>
                        <div className="text-muted small">{review.date}</div>
                      </div>
                    </div>
                    <p className="small">{review.comment}</p>
                  </div>
                ))}
              </div>
              {reviews.length > 6 && (
                <button className="btn btn-outline-dark">Show all {listing.reviews} reviews</button>
              )}
            </div>

            {/* Host */}
            <div className="border-bottom pb-4 mb-4">
              <h5 className="fw-bold mb-3">Hosted by {listing.host}</h5>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: 64, height: 64, fontSize: "24px" }}
                >
                  {listing.host?.[0]}
                </div>
                <div>
                  <div className="fw-semibold">Joined June 2024</div>
                </div>
              </div>
              <div className="d-flex gap-4 mb-3 small">
                <span><i className="bi bi-star-fill text-danger"></i> {listing.reviews} Reviews</span>
                <span><i className="bi bi-patch-check-fill text-danger"></i> Identity verified</span>
                <span><i className="bi bi-award-fill text-danger"></i> Superhost</span>
              </div>
              <p className="text-muted">
                {listing.host} is a super host. Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
              </p>
              <p className="small">Response rate: 100%</p>
              <p className="small">Response time: within an hour</p>
              <button className="btn btn-outline-dark">Contact Host</button>
              <p className="text-muted small mt-3">
                <i className="bi bi-shield-check"></i> To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
              </p>
            </div>

            {/* Policies */}
            <div className="row mb-5">
              <div className="col-md-4">
                <h6 className="fw-bold mb-3">House Rules</h6>
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2"><i className="bi bi-clock me-2"></i>Check-in: After 4:00 PM</li>
                  <li className="mb-2"><i className="bi bi-clock me-2"></i>Check-out: 10:00 AM</li>
                  <li className="mb-2"><i className="bi bi-key me-2"></i>Self check-in with lockbox</li>
                  <li className="mb-2"><i className="bi bi-person-x me-2"></i>Not suitable for infants (under 2 years)</li>
                  <li className="mb-2"><i className="bi bi-slash-circle me-2"></i>No smoking</li>
                  <li className="mb-2"><i className="bi bi-slash-circle me-2"></i>No parties or events</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h6 className="fw-bold mb-3">Health &amp; Safety</h6>
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2">Committed to Airbnb&apos;s enhanced cleaning process. </li>
                  <li className="mb-2">Airbnb&apos;s social-distancing guidelines apply</li>
                  <li className="mb-2">Carbon monoxide alarm</li>
                  <li className="mb-2">Smoke alarm</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h6 className="fw-bold mb-3">Cancellation Policy</h6>
                <p className="small text-muted">Free cancellation before Feb 14. </p>
              </div>
            </div>
          </div>

          {/* Reservation calendar */}
          <div className="col-lg-5">
            {/* props */}
            <ReservationWidget listing={listing} />   
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
