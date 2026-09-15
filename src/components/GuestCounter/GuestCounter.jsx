import React, { useState, useRef, useEffect } from "react";

const GuestCounter = ({ adults, children, onChange, compact = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = adults + children;
  const label = total === 1 ? "1 guest" : `${total} guests`;

  const update = (field, delta) => {
    const next = { adults, children, [field]: Math.max(0, (field === "adults" ? adults : children) + delta) };
    if (next.adults < 1) next.adults = 1;
    onChange(next);
  };

  return (
    <div className="position-relative" ref={ref}>
      <button
        type="button"
        className={`btn w-100 text-start  ${compact ? "border-0 bg-transparent p-2" : "border-0 rounded-3"}`}
        onClick={() => setOpen(!open)}
      >
        {compact ? (
          <>
            <small className="text-muted d-block fw-bold" style={{ fontSize: "10px" }}>GUESTS</small>
            <span>{label}</span>
          </>
        ) : (
          <span className="text-muted">{label}</span>
        )}
      </button>

      {open && (
        <div
          className="position-absolute bg-white border rounded-3 shadow p-3 mt-1"
          style={{ zIndex: 1050, minWidth: "260px", right: 0 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="fw-semibold">Adults</div>
              <small className="text-muted">Ages 13+</small>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
                onClick={() => update("adults", -1)}
                disabled={adults <= 1}
              >
                −
              </button>
              <span>{adults}</span>
              <button
                type="button"
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
                onClick={() => update("adults", 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">Children</div>
              <small className="text-muted">Ages 2–12</small>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
                onClick={() => update("children", -1)}
                disabled={children <= 0}
              >
                −
              </button>
              <span>{children}</span>
              <button
                type="button"
                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32 }}
                onClick={() => update("children", 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;
