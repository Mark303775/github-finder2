import RepositoryItem from "./RepositoryItem.jsx";

export default function RepositoryList({ repos }) {
  return (
    <section>
      <h2 className="section-title">Latest repositories</h2>
      {repos.length === 0 ? (
        <p className="empty">This user has no public repositories yet.</p>
      ) : (
        <ul className="repo-grid">
          {repos.map((repo) => (
            <RepositoryItem key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </section>
  );
}
