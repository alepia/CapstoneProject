import React from "react";

export default function GetLikes(props) {
  return (
    <>
      <h1>Like Id: {props.id}</h1>
      <h1>Post_id: {props.post_id}</h1>
      <h1>User_id: {props.user_id}</h1>
    </>
  );
}
