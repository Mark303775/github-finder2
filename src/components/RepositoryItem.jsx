export default function RepositoryItem({ repo }) {
  return (
    <li className="card repo">
      <a className="repo-name" href={repo.html_url} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </a>
      <p className="repo-desc">{repo.description || "No description provided."}</p>
      <div className="repo-meta">
        {repo.language && <span className="lang">{repo.language}</span>}
        <span title="Stars">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 .25a.75.75 0 0 1 .67.42l1.88 3.8 4.2.61a.75.75 0 0 1 .42 1.28l-3.04 2.96.72 4.18a.75.75 0 0 1-1.09.79L8 12.3l-3.76 1.99a.75.75 0 0 1-1.09-.79l.72-4.18L.83 6.36a.75.75 0 0 1 .42-1.28l4.2-.61 1.88-3.8A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span title="Forks">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M5 3.25a1.75 1.75 0 1 1 2.5 1.58V6.5h1V4.83a1.75 1.75 0 1 1 1.5 0V7a1 1 0 0 1-1 1h-1v1.17a1.75 1.75 0 1 1-1.5 0V8h-1a1 1 0 0 1-1-1V4.83A1.75 1.75 0 0 1 5 3.25Z" />
          </svg>
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </li>
  );
}
