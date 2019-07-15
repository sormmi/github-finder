import React from 'react';
import RepoItem from './repo-item.component';

const RepoList = ({ repos }) => {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

export default RepoList;
