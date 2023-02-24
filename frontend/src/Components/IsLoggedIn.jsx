import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function IsLoggedIn(props) {
  const IsLoggedIn = useSelector((store) => store.auth.isLoggedIn)
  return IsLoggedIn ? props.children : <Navigate to="/login"/>
}
