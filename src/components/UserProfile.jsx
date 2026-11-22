export default function UserProfile({ user }) {
  return (
    <section className="card profile">
      <img className="avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        <p className="login">@{user.login}</p>
        <p className="bio">{user.bio || "This user has no bio."}</p>
        <ul className="details">
          <li><strong>Location</strong> {user.location || "Not listed"}</li>
          <li><strong>Company</strong> {user.company || "Not listed"}</li>
        </ul>
        <a className="btn-link" href={user.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </section>
  );
}
