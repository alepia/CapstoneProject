import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsThunk,
  addPostThunk,
  deletePostThunk,
} from "../redux/postSlice";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import AddBtn from "../Components/AddBtn";
import "../sass/Modular.scss";

export default function UserPage() {
  const posts = useSelector((store) => store.postsData.postList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="grid-container">
        {posts.map((obj) => {
          return (
            <div className="card grid-item" key={obj.id}>
              <Posts
                className="postCard"
                id={obj.id}
                name={obj.name}
                image={obj.img}
                caption={obj.caption}
                delete={(id) => {
                  dispatch(deletePostThunk(id));
                }}
              />
            </div>
          );
        })}
      </div>
        <AddBtn
          newPost={(post) => {
            dispatch(addPostThunk(post));
          }}
        />
    </>
  );
}
