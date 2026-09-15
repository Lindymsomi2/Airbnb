import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ListingCard from "../components/ListingCard/ListingCard";
import { api, slugToLabel } from "../utils/api";

const Locations = () => {
  const { locationSlug } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .getAccommodations(locationSlug)
      .then(setListings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [locationSlug]);

  const locationLabel =
    locationSlug === "all" ? "all locations" : slugToLabel(locationSlug);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h4 className="text-center fw-semibold mb-5">
          {listings.length} stays in {locationLabel}
        </h4>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {!loading && !error && listings.length === 0 && (
          <p className="text-center text-muted">No listings found for this location.</p>
        )}

        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Locations;
