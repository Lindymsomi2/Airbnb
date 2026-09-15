import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormGroup } from "./SearchBar.styled";
import GuestCounter from "../GuestCounter/GuestCounter";

const SearchBar = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0 });

  const handleLocationChange = (e) => {
    const slug = e.target.value;
    setLocation(slug);
    if (slug) {
      navigate(`/locations/${slug}`);
    }
  };

  const handleSearch = () => {
    const slug = location || "all";
    navigate(`/locations/${slug}`);
  };

  const guestTotal = guests.adults + guests.children;
  const guestLabel = guestTotal === 0 ? "0 guests" : guestTotal === 1 ? "1 guest" : `${guestTotal} guests`;

  return (
    <FormContainer>
      <FormGroup>
        <label htmlFor="location">Locations</label>
        <select
          id="location"
          className="form-select"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">Select a location</option>
          <option value="all">All Locations</option>
          <option value="new-york">New York</option>
          <option value="paris">Paris</option>
          <option value="tokyo">Tokyo</option>
          <option value="cape-town">Cape Town</option>
          <option value="thailand">Thailand</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label htmlFor="checkIn">Check in date</label>
        <input
          type="date"
          id="checkIn"
          className="form-control"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Select date"
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="checkOut">Checkout date</label>
        <input
          type="date"
          id="checkOut"
          className="form-control"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Select date"
        />
      </FormGroup>

      <FormGroup>
        <label>Guests</label>
        {variant === "hero" ? (
          <GuestCounter adults={guests.adults} children={guests.children} onChange={setGuests} />
        ) : (
          <span className="text-muted " style={{ fontSize: "12px" }}>{guestLabel}</span>
        )}
      </FormGroup>

      <button type="button" className="search-btn" onClick={handleSearch} aria-label="Search">
        <i className="bi bi-search"></i>
      </button>
    </FormContainer>
  );
};

export default SearchBar;
