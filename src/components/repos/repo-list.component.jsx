import React, { useContext } from 'react';
import RepoItem from './repo-item.component';
import GithubContext from '../../context/github/githubContext';

const RepoList = () => {
  const githubContext = useContext(GithubContext);
  const { repos } = githubContext;
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

export default RepoList;
