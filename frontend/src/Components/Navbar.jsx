import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../sass/navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutThunk } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.auth.isLoggedIn);

  return (
    <div>
      <header>
        <a href="/">
          <h3 className="logo">TouristInn</h3>
        </a>
        <nav className="nav__links">
          <ul>
            <li>
            </li>
          </ul>
        </nav>
        <div className="icons__nav">
          <a href="/login">
            <FontAwesomeIcon icon={faUser} />
          </a>
          <a href="/saved">
            {isAuthenticated ? <FontAwesomeIcon icon={faBookmark} /> : null}
          </a>
          <a href="/login">
            {isAuthenticated ? (
              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={() => dispatch(logoutThunk())}
              />
            ) : null}
          </a>
        </div>
      </header>
    </div>
  );
}
