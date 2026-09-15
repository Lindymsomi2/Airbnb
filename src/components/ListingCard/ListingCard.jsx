import React from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const id = listing._id || listing.id;
  const image = listing.images?.[0] || listing.image;

  return (
    <div
      className="card mb-4 border shadow-sm listing-card"
      style={{ cursor: "pointer", maxWidth: "900px", margin: "0 auto 24px" }}
      onClick={() => navigate(`/listings/${id}`)}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={image}
            className="img-fluid rounded-start h-100 object-fit-cover"
            alt={listing.title}
            style={{ minHeight: "200px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100 p-4">
            <small className="text-muted text-uppercase">{listing.type}</small>
            <h5 className="card-title fw-bold mt-1">{listing.location}</h5>
            <p className="card-text text-muted mb-1">
              {listing.guests} guests · {listing.type} · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms
            </p>
            <p className="card-text text-muted mb-2">
              {listing.amenities?.slice(0, 3).join(" · ")}
            </p>
            <div className="d-flex justify-content-between align-items-end mt-auto">
              <span>
                <i className="bi bi-star-fill text-warning"></i>{" "}
                {listing.rating} ({listing.reviews} reviews)
              </span>
              <span className="fw-bold fs-5">
                ${listing.price} <span className="fw-normal fs-6 text-muted">/ night</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
