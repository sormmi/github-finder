import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search users
  const searchUsers = async searchText => {
    setLoading();
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/search/users?q=${searchText}`);
    //setUsers(res.data.items);

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get user by login
  const getUser = async username => {
    setLoading();
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/users/${username}`);

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get user's repos
  const getUserRepos = async username => {
    setLoading();
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:desc`);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
