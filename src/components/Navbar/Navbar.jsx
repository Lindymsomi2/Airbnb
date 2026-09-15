import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { NavWrapper, Suggestions, ProfileButton } from "./Navbar.styles";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <NavWrapper className={isHomePage ? "hero-nav" : "solid-nav"}>
        <Logo className="logo" onClick={() => navigate("/")} />

        {isHomePage ? (
          <Suggestions>
            <ul className="list-group list-group-horizontal list-group-flush">
              <li className="list-group-item border-0">Places to stay</li>
              <li className="list-group-item border-0">Experiences</li>
              <li className="list-group-item border-0">Online Experiences</li>
            </ul>
          </Suggestions>
        ) : (
          // <div style={{ flex: 1, maxWidth: "850px", margin: "0 24px" }}>
            <SearchBar />
          // </div>
        )}

        <Suggestions>
          {!isAuthenticated ? (
            <Link to="/login" className="text-decoration-none me-3" style={{ color: isHomePage ? "white" : "#222", fontSize: "14px", fontWeight: 500 }}>
              Become a host
            </Link>
          ) : (
            <span className="me-3 d-none d-md-inline" style={{ color: isHomePage ? "white" : "#222", fontSize: "14px" }}>
              Hi, {user?.username}
            </span>
          )}
          <i className={`bi bi-globe me-2 ${isHomePage ? "text-white" : ""}`}></i>
          <div className="profile-menu" ref={menuRef}>
            <ProfileButton onClick={() => setMenuOpen(!menuOpen)}>
              <i className="bi bi-list"></i>
              <i className="bi bi-person-circle fs-5"></i>
            </ProfileButton>
            {menuOpen && (
              <div className="dropdown-menu-custom">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                    )}
                    <Link to="/reservations" onClick={() => setMenuOpen(false)}>My Reservations</Link>
                    <button onClick={handleLogout}>Log out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Sign up</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </Suggestions>
      </NavWrapper>
    </>
  );
};

export default Navbar;
