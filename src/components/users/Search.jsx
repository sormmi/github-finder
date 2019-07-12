import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  };

  onSearchChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            placeholder='Search Users...'
            value={this.state.text}
            name='text'
            onChange={this.onSearchChange}
          />
          <input type='submit' value='Search' className='btn btn-dark btn-block' />
        </form>

        {this.props.isClearVisible && (
          <button className='btn btn-light btn-block' onClick={this.props.clearSearch}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
