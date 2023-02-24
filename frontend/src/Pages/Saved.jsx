import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getSavedPostThunk,
  // savePostThunk,
  // deleteSavedPostThunk,
} from "../redux/postSlice";
import PostCard from "../Components/PostCard";

export default function Saved() {
  const posts = useSelector((store) => store.postsData.postList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostThunk());
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
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
