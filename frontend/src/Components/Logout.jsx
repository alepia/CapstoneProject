import React from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


export default function Logout() {
  const dispatch = useDispatch();

  return (
    <div>
      <button className="logoutBtn" onClick={() => dispatch(logoutThunk())}>
          <FontAwesomeIcon icon={faRightFromBracket} className="addIcon"/>
      </button>
    </div>
  );
}
