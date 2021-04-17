import React from 'react';
import classes from './Users.module.css';
import userAvatar from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const User = ({ user, isFollowingInProgress, unfollowUser, followUser }) => {
  return (
    <div className={classes.userItem}>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img
            src={user.photos.small ? user.photos.small : userAvatar}
            alt="user"
            className={classes.userPhoto}
          />
        </NavLink>

        {user.followed ? (
          <button
            disabled={isFollowingInProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollowUser(user.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={isFollowingInProgress.some((id) => id === user.id)}
            onClick={() => {
              followUser(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div>
        <div>
          <p>{user.name}</p>
          <p>{user.status}</p>
        </div>
        <div>
          <p>{'user.location.city'}</p>
          <p>{'user.location.country'}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
