import React from "react";
import "../sass/Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHeart,
  faBookmark,
  // faComment,
} from "@fortawesome/free-regular-svg-icons";

export default function PostCard(props) {
  return (
    <>
      <h5 className="container_name">{props.name}</h5>
      <img
        src={`http://localhost:8080/image/` + props.image}
        alt=""
        style={{ width: "100%" }}
      />
      <div className="container">
        <h6>{props.name}:</h6>
        <p>{props.caption}</p>
        <div className="like_container">
          {/* <FontAwesomeIcon className="icons like" icon={faHeart} /> */}
          {/* <FontAwesomeIcon className="icons comment" icon={faComment} /> */}
          <FontAwesomeIcon
            className="icons save"
            icon={faBookmark}
            onClick={() => {
              props.save(props.id);
            }}
          />
        </div>
      </div>
    </>
  );
}
