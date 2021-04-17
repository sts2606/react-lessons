import { usersAPI } from '../../api/api';
import { updateObjectInArray } from '../../utils/object-helper';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        isFollowingInProgress: action.isFollowingInProgress
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

const follow = (userId) => {
  return { type: FOLLOW, userId };
};

const unfollow = (userId) => {
  return { type: UNFOLLOW, userId };
};

const setUsers = (users) => {
  return { type: SET_USERS, users };
};

const setCurrentPage = (page) => {
  return { type: SET_CURRENT_PAGE, page };
};

const setTotalUsersCount = (count) => {
  return { type: SET_TOTAL_USERS_COUNT, count };
};

const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};

const toggleFollowingInProgress = (isFollowingInProgress, userId) => {
  return {
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userId,
  };
};

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  userId,
  dispatch,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingInProgress(true, userId));
  const res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
};

export const followUser = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      userId,
      dispatch,
      usersAPI.follow.bind(usersAPI),
      follow
    );
  };
};

export const unfollowUser = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      userId,
      dispatch,
      usersAPI.unfollow.bind(usersAPI),
      unfollow
    );
  };
};

export default usersReducer;
