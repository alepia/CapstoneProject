import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postList: [],
  savedPosts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.postList = action.payload;
    },

    addPost: (state, action) => {
      console.log("add post", state.postList);
      state.postList.push(action.payload);
    },

    deletePost: (state, action) => {
      console.log("delete post", state.postList);
      let index = state.postList.findIndex((obj) => obj.id === action.payload);
      console.log("index", index);
      state.postList.splice(index, 1);
    },

    savePost: (state, action) => {
      console.log("save post", state.postList);
      let index = state.postList.findIndex((obj) => obj.id === action.payload);
      console.log("index", index);
      state.postList[index].saved = true;
    },

    getSavedPost: (state, action) => {
      console.log("get saves post", state.postList);
      state.postList = action.payload;
    },

    deleteSavedPost: (state, action) => {
      console.log("delete saved post", state.postList);
      let index = state.postList.findIndex((obj) => obj.id === action.payload);
      console.log("index", index);
      state.postList.splice(index, 1);
    },
  },
});

//Get posts for home page
export const getPostsHomeThunk = () => async (dispatch) => {
  const response = await axios(`http://localhost:8080/api/posts/home`, {});
  console.log("getPosts", response.data);
  dispatch(getPosts(response.data));
};

export const getPostsThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await axios(`http://localhost:8080/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getPosts", response.data);
  dispatch(getPosts(response.data));
};

export const addPostThunk =
  ({ image, caption, extension }) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");
    const imgToken = token.split(".")[1];
    let img_name = `${imgToken}_${new Date().getTime()}.${extension}`;
    let response = await axios.post(
      "http://localhost:8080/api/post",
      {
        img_name,
        caption,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await axios.post(
      "http://localhost:8080/api/upload/" + response.data.img,
      image,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    let res = await axios.get("http://localhost:8080/api/posts");
    dispatch(getPosts(res.data));
  };

export const deletePostThunk = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8080/api/post/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(deletePost(id));
};

export const savePostThunk = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios.post(
    `http://localhost:8080/api/save/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  dispatch(savePost(id));
};

export const getSavedPostThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await axios(`http://localhost:8080/api/saved`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getSavedPost", response.data);
  dispatch(getSavedPost(response.data));
};

export const deleteSavedPostThunk = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8080/api/saved/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(deleteSavedPost(id));
};

export const {
  getPosts,
  addPost,
  deletePost,
  savePost,
  getSavedPost,
  deleteSavedPost,
} = postSlice.actions;

export default postSlice.reducer;
