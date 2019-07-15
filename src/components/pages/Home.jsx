import React, { Fragment } from 'react';
import Search from '../users/Search';
import UserList from '../users/user-list.component';

const Home = () => (
  <Fragment>
    <Search />
    <UserList />
  </Fragment>
);

export default Home;
