import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "../sass/Modular.scss";

export default function AddBtn(props) {
  const dispatch = useDispatch();
  const [post, setPost] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPost((prev) => ({
        ...prev,
        [name]: value,
      }))
    );
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="addBtn">
            <FontAwesomeIcon icon={faSquarePlus} className="addIcon" />
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal container">
            <div className="content card">
              <div className="upload-container">
                <input
                  className="imageInput"
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  onChange={(e) => {
                    const data = new FormData();
                    data.append("file", e.target.files[0]);
                    let extension = e.target.files[0].name.split(".")[1];
                    setPost((prev) => ({
                      ...prev,
                      image: data,
                      extension,
                    }));
                  }}
                />
                <div>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className="file-upload-button"
                    />
                  </label>
                  <div className="img-preview">
                    <img src="{preview}" alt="" />
                  </div>
                </div>
                <div>
                  <textarea
                    type="text"
                    name="caption"
                    maxLength={"120"}
                    placeholder="Caption"
                    className="post-upload-comment"
                    onChange={handleChange}
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="btnContainer">
                <a href="/user">
                  {" "}
                  <button
                    className="submitBtn"
                    onClick={() => {
                      props.newPost(post);
                      close();
                    }}
                  >
                    Submit
                  </button>
                </a>

                <button className="closeBtn" onClick={() => close()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
