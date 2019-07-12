import React from 'react';
import Spinner from './../layout/Spinner';
import UserItem from './user-item.component';
import './user-list.style.css';

const UserList = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='grid'>
      {users.map(u => (
        <UserItem key={u.id} user={u} />
      ))}
    </div>
  );
};

export default UserList;
