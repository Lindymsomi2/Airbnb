import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api, LOCATIONS } from "../../utils/api";

const defaultForm = {
  title: "",
  location: "New York",
  locationSlug: "new-york",
  description: "",
  enhancedCleaning: true,
  selfCheckIn: true,
  price: "",
  type: "Entire apartment",
  guests: "4",
  bedrooms: "2",
  bathrooms: "2",
  amenityInput: "",
  amenities: [],
  images: [""],
  weeklyDiscount: "0",
  cleaningFee: "50",
  serviceFee: "50",
  occupancyTaxes: "30",
  host: "Admin",
  rating: "4.5",
  reviews: "0",
};

const ListingForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api.getAccommodation(id).then((data) => {
        setForm({
          ...defaultForm,
          ...data,
          guests: String(data.guests),
          bedrooms: String(data.bedrooms),
          bathrooms: String(data.bathrooms),
          price: String(data.price),
          weeklyDiscount: String(data.weeklyDiscount || 0),
          cleaningFee: String(data.cleaningFee || 50),
          serviceFee: String(data.serviceFee || 50),
          occupancyTaxes: String(data.occupancyTaxes || 30),
          rating: String(data.rating || 4.5),
          reviews: String(data.reviews || 0),
          amenityInput: "",
          images: data.images?.length ? data.images : [""],
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "location") {
      const slug = LOCATIONS.find((l) => l.label === value)?.slug || value.toLowerCase().replace(/\s+/g, "-");
      setForm((prev) => ({ ...prev, location: value, locationSlug: slug }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleAddAmenity = () => {
    if (form.amenityInput.trim()) {
      setForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, prev.amenityInput.trim()],
        amenityInput: "",
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const images = [...form.images];
    images[index] = value;
    setForm((prev) => ({ ...prev, images }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Valid price is required";
    if (!form.type) errs.type = "Type is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");

    const payload = {
      ...form,
      guests: Number(form.guests),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      price: Number(form.price),
      weeklyDiscount: Number(form.weeklyDiscount),
      cleaningFee: Number(form.cleaningFee),
      serviceFee: Number(form.serviceFee),
      occupancyTaxes: Number(form.occupancyTaxes),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      images: form.images.filter(Boolean),
    };
    delete payload.amenityInput;

    try {
      if (isEdit) {
        await api.updateAccommodation(id, payload, token);
      } else {
        await api.createAccommodation(payload, token);
      }
      navigate("/admin/listings");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      <h3 className="fw-bold mb-4">{isEdit ? "Edit Listing" : "Create Listing"}</h3>
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Listing Title</label>
              <input type="text" name="title" className={`form-control ${errors.title ? "is-invalid" : ""}`} value={form.title} onChange={handleChange} />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <select name="location" className="form-select" value={form.location} onChange={handleChange}>
                {LOCATIONS.filter((l) => l.slug !== "all").map((l) => (
                  <option key={l.slug} value={l.label}>{l.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea name="description" rows="5" className={`form-control ${errors.description ? "is-invalid" : ""}`} value={form.description} onChange={handleChange} />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="d-flex gap-4 mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="enhancedCleaning" name="enhancedCleaning" checked={form.enhancedCleaning} onChange={handleChange} />
                <label className="form-check-label" htmlFor="enhancedCleaning">Enhanced Cleaning</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="selfCheckIn" name="selfCheckIn" checked={form.selfCheckIn} onChange={handleChange} />
                <label className="form-check-label" htmlFor="selfCheckIn">Self Check-In</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Amenities</label>
              <div className="input-group">
                <input type="text" name="amenityInput" className="form-control" value={form.amenityInput} onChange={handleChange} />
                <button type="button" className="btn btn-primary" onClick={handleAddAmenity}>Add</button>
              </div>
              <ul className="list-group mt-2">
                {form.amenities.map((a, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    {a}
                    <button type="button" className="btn btn-sm btn-link text-danger" onClick={() => setForm((prev) => ({ ...prev, amenities: prev.amenities.filter((_, j) => j !== i) }))}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold">Price</label>
                <input type="number" name="price" className={`form-control ${errors.price ? "is-invalid" : ""}`} value={form.price} onChange={handleChange} />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Type</label>
                <select name="type" className={`form-select ${errors.type ? "is-invalid" : ""}`} value={form.type} onChange={handleChange}>
                  <option value="Entire apartment">Entire apartment</option>
                  <option value="Entire home">Entire home</option>
                  <option value="Private room">Private room</option>
                  <option value="Entire villa">Entire villa</option>
                </select>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-4">
                <label className="form-label fw-semibold">Guests</label>
                <input type="number" name="guests" className="form-control" value={form.guests} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label className="form-label fw-semibold">Bedrooms</label>
                <input type="number" name="bedrooms" className="form-control" value={form.bedrooms} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label className="form-label fw-semibold">Bathrooms</label>
                <input type="number" name="bathrooms" className="form-control" value={form.bathrooms} onChange={handleChange} />
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold">Cleaning Fee</label>
                <input type="number" name="cleaningFee" className="form-control" value={form.cleaningFee} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Service Fee</label>
                <input type="number" name="serviceFee" className="form-control" value={form.serviceFee} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Image URLs</label>
              {form.images.map((img, i) => (
                <input
                  key={i}
                  type="url"
                  className="form-control mb-2"
                  placeholder="https://..."
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                />
              ))}
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addImageField}>+ Add Image URL</button>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button type="submit" className="btn text-white flex-grow-1 py-2" style={{ background: "#ff385c" }} disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
              </button>
              <button type="button" className="btn btn-outline-secondary py-2" onClick={() => navigate("/admin/listings")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
