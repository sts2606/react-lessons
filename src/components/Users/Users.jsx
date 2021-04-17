import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div>
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      {users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            isFollowingInProgress={props.isFollowingInProgress}
            unfollowUser={props.unfollowUser}
            followUser={props.followUser}
          />
        );
      })}
    </div>
  );
};

export default Users;
