export interface RepositoryResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
export interface RepositoryOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  received_events_url: string;
  type: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  forks_count: number;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  site_admin: boolean;
}
export interface RepositoryLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}
export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: RepositoryOwner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  archive_url: string;
  license: RepositoryLicense;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  forks: number;
  open_issues: number;
  watchers: number;
  has_issues: boolean;
  has_projects: boolean;
  has_pages: boolean;
  has_wiki: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
}
