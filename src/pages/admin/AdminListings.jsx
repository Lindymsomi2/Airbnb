import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";

const AdminListings = () => {
  const { token } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = () => {
    api
      .getAccommodations()
      .then(setListings)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await api.deleteAccommodation(id, token);
      fetchListings();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">All Listings</h3>
        <div>
          <Link to="/admin/reservations" className="btn btn-dark ">
            View Reservations
          </Link>
          <Link
            to="/admin/listings/create"
            className="btn btn-light border border-black ms-2"
          >
            Create Listing
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="spinner-border text-danger"></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing._id}>
                  <td>
                    <img
                      src={listing.images?.[0]}
                      alt=""
                      style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </td>
                  <td>{listing.title}</td>
                  <td>{listing.location}</td>
                  <td>${listing.price}/night</td>
                  <td>{listing.type}</td>
                  <td>
                    <Link
                      to={`/admin/listings/${listing._id}/edit`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(listing._id)}
                    >
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

export default AdminListings;
