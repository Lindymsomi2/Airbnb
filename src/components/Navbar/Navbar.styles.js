import styled from "styled-components";

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 40px;
  position: relative;
  z-index: 20;

  &.hero-nav {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    background: black;
    color: white;

    .list-group-item {
      background: transparent;
      color: white;
    }

    a {
      color: white;
    }
  }

  &.solid-nav {
    background: white;
    border-bottom: 1px solid #ebebeb;
  }

  .logo {
    height: 32px;
    width: 102px;
    cursor: pointer;
  }
`;

export const Suggestions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .list-group-item {
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }

  .profile-menu {
    position: relative;
  }

  .dropdown-menu-custom {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    padding: 8px 0;
    margin-top: 8px;

    button, a {
      display: block;
      width: 100%;
      text-align: left;
      padding: 10px 16px;
      border: none;
      background: none;
      color: #222;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        background: #f7f7f7;
      }
    }
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 24px;
  padding: 5px 5px 5px 12px;
  background: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
`;
