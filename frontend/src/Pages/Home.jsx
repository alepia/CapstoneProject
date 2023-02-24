import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsHomeThunk, savePostThunk, deleteSavedPostThunk } from "../redux/postSlice";
import "../sass/Home.scss";
import "../sass/Card.scss";
import PostCard from "../Components/PostCard";
import Navbar from "../Components/Navbar";

export default function Home() {
  const posts = useSelector((store) => store.postsData.postList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsHomeThunk());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="grid-container">
        {posts.map((obj) => {
          return (
            <div className="card grid-item" key={obj.id}>
              <PostCard
                className="postCard"
                id={obj.id}
                name={obj.name}
                image={obj.img}
                caption={obj.caption}
                save={(id) => {
                  dispatch(savePostThunk(id));
                }}
                deleteSaved={(id) => {
                  dispatch(deleteSavedPostThunk(id));
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
