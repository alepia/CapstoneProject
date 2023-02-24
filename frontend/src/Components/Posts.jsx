import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHeart,
  // faComment,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

export default function Posts(props) {
  return (
    <div className="card grid-item">
      <h5 className="container_name">{props.name}</h5>
      <img
        src={`http://localhost:8080/image/` + props.image}
        alt=""
        style={{ width: "100%" }}
      />
      <div className="container">
        <p>{props.caption}</p>
        {/* Agregar botones */}
        <div className="like_container">
          {/* <FontAwesomeIcon className="icons like" icon={faHeart} /> */}
          {/* <FontAwesomeIcon className="icons comment" icon={faComment} /> */}
          <FontAwesomeIcon
            className="icons save"
            icon={faTrashCan}
            onClick={() => props.delete(props.id)}
          />
        </div>
      </div>
    </div>
  );
}
