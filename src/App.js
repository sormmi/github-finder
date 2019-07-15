import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import UserList from './components/users/user-list.component';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // find users by name
  const searchUsers = async searchText => {
    setLoading(true);
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/search/users?q=${searchText}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  // find single users by login
  const getUser = async username => {
    setLoading(true);
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  // find user's repos
  const getUserRepos = async username => {
    setLoading(true);
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:desc`);
    setRepos(res.data);
    setLoading(false);
  };

  // clear state
  const clearSearch = () => {
    setUsers([]);
    setLoading(false);
  };

  const showMessage = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar title='Github Finder' />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearSearch={clearSearch}
                    isClearVisible={users.length > 0}
                    setAlert={showMessage}
                  />
                  <UserList users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/users/:username'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
