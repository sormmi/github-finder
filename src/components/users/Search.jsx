import React, { useState } from 'react';

const Search = ({ setAlert, searchUsers, clearSearch, isClearVisible }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter some search text', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const onSearchChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input type='text' placeholder='Search Users...' value={text} name='text' onChange={onSearchChange} />
        <input type='submit' value='Search' className='btn btn-dark btn-block' />
      </form>

      {isClearVisible && (
        <button className='btn btn-light btn-block' onClick={clearSearch}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
