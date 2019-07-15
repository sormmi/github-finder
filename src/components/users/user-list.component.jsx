import React, { useContext } from 'react';
import Spinner from './../layout/Spinner';
import GithubContext from '../../context/github/githubContext';
import UserItem from './user-item.component';
import './user-list.style.css';

const UserList = () => {
  const githubContext = useContext(GithubContext);

  const { users, loading } = githubContext;

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
