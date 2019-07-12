import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import UserList from './components/users/user-list.component';
import axios from 'axios';
import Search from './components/users/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false
    };
  }

  // find users by name
  searchUsers = async searchText => {
    this.setState({ loading: true });
    //const res = await axios.get('https://api.github.com/search/users?q={searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const res = await axios.get(`https://api.github.com/search/users?q=${searchText}`);
    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  // clear state
  clearSearch = () => this.setState({ users: [], loading: false });

  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearSearch={this.clearSearch}
            isClearVisible={this.state.users.length > 0}
          />
          <UserList users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
