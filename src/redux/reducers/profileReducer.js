import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    { id: 1, message: 'Post 1', likesCount: 2 },
    { id: 2, message: 'Post 2', likesCount: 2 },
    { id: 3, message: 'Post 3', likesCount: 4 },
    { id: 4, message: 'Post 4', likesCount: 5 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 7,
        message: action.newPostBody,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    }
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostBody) => {
  return { type: ADD_POST, newPostBody };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status: status,
  };
};

const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile: profile };
};

export const deletePost = (postId) => {
  return { type: DELETE_POST, postId };
};

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    const res = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(res.data));
  };
};

export const getUserStatus = (userId) => {
  return async (dispatch) => {
    const res = await profileAPI.getStatus(userId);
    dispatch(setStatus(res.data));
  };
};

export const updateStatus = (status) => {
  return async (dispatch) => {
    const res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

export default profileReducer;
