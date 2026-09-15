import React, { useState } from 'react';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: 'Charming Home in Paris',
    location: 'Paris',
    description: `neighborhood, this home offers a peaceful retreat after a day of exploring the city's iconic landmarks. The stylish decor and comfortable furnishings make it a perfect choice for families or groups. Enjoy local cafes, boutiques, and parks within walking distance. With easy access to public transportation, you can effortlessly visit all the major attractions Paris has to offer.`,
    enhancedCleaning: true,
    selfCheckIn: false,
    price: '400',
    type: '',
    guests: '6',
    bedrooms: '3',
    bathrooms: '3',
    amenityInput: '',
    amenities: ['WiFi', 'kitchen', 'free parking'],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddAmenity = () => {
    if (formData.amenityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, prev.amenityInput.trim()],
        amenityInput: '',
      }));
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <h2 className="text-center fw-bold mb-4">Create Listing</h2>

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-md-6">
          {/* Listing Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Listing Title</label>
            <input
              type="text"
              className="form-control border-dark rounded-3"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <select
              className="form-select border-dark rounded-3"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="Paris">Paris</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control border-dark rounded-3"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Checkboxes */}
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input border-dark"
                id="enhancedCleaning"
                name="enhancedCleaning"
                checked={formData.enhancedCleaning}
                onChange={handleChange}
              />
              <label className="form-check-label fw-semibold" htmlFor="enhancedCleaning">
                Enhanced Cleaning
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input border-dark"
                id="selfCheckIn"
                name="selfCheckIn"
                checked={formData.selfCheckIn}
                onChange={handleChange}
              />
              <label className="form-check-label fw-semibold" htmlFor="selfCheckIn">
                Self Check-In
              </label>
            </div>
          </div>

          {/* Amenities Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Amenities</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control border-dark rounded-start-3"
                name="amenityInput"
                value={formData.amenityInput}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-primary bg-blue px-4"
                style={{ backgroundColor: '#1a18d3', borderColor: '#1a18d3' }}
                onClick={handleAddAmenity}
              >
                Add
              </button>
            </div>
          </div>

          {/* Amenities List */}
          <ul className="list-group list-group-flush rounded-3 border">
            {formData.amenities.map((amenity, index) => (
              <li
                key={index}
                className="list-group-item bg-light text-secondary border-bottom"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          {/* Price & Type Row */}
          <div className="row g-2 mb-3">
            <div className="col-6">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                className="form-control border-dark rounded-3"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Type</label>
              <select
                className="form-select border-dark rounded-3"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>

          {/* Guests, Bedrooms, Bathrooms Row */}
          <div className="row g-2 mb-4">
            <div className="col-4">
              <label className="form-label fw-semibold">Guests</label>
              <input
                type="number"
                className="form-control border-dark rounded-3"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="form-label fw-semibold">Bedrooms</label>
              <input
                type="number"
                className="form-control border-dark rounded-3"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="form-label fw-semibold">Bathrooms</label>
              <input
                type="number"
                className="form-control border-dark rounded-3"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Upload Images Button */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: '#1a18d3', borderColor: '#1a18d3' }}
            >
              Upload Images
            </button>
          </div>

          {/* Image Container Box */}
          <div
            className="border border-dark rounded-3 d-flex align-items-center justify-content-center bg-light text-secondary mb-4"
            style={{ height: '140px' }}
          >
            <span>No images uploaded</span>
          </div>

          {/* Bottom Actions: Update & Cancel */}
          <div className="row g-3">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-primary w-100 py-2 fw-semibold"
                style={{ backgroundColor: '#1a18d3', borderColor: '#1a18d3' }}
              >
                Update
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-danger w-100 py-2 fw-semibold"
                style={{ backgroundColor: '#a70016', borderColor: '#a70016' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
