import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faComment,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import "../sass/Comments.scss";

export default function CommentsPost(props) {
  return (
    <div className="comment_section">
      <div className="flexContainer">
        <div className="card_container_comment">
          <div className="flexItem flexItemUno">
            <h5 className="container_name_comment">Nombre Random</h5>
            <img
              src={`http://localhost:8080/image/` + props.image}
              alt=""
              style={{ width: "100%" }}
            />
            <div className="container_comment">
              <p className="caption">una caption random</p>
              <div className="like_container_comment">
                <FontAwesomeIcon className="icons like" icon={faHeart} />
                <FontAwesomeIcon className="icons comment" icon={faComment} />
                <FontAwesomeIcon className="icons save" icon={faBookmark} />
              </div>
            </div>
          </div>
        </div>
        {/* Comentarios */}
        <div className="flexItem">
          <div className="div_scroll">
            <div className="comentario">
              <h6>Nombre de quien comento</h6>
              <p>un comentasfinaisdf onasodfnoasd</p>{" "}
              <span>
                <FontAwesomeIcon icon={faTrashCan} className="delete"/>
              </span>
            </div>
            
          </div>
          <div className="add_comment">
            <textarea
              title="comment"
              name="comment"
              placeholder="Add a comment"
              id=""
              cols="48"
              rows="3"
              maxLength={120}
              spellCheck="false"
            />
            <FontAwesomeIcon icon={faPaperPlane} className="icon send" />
          </div>
        </div>
      </div>
    </div>
  );
}
