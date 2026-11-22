export default function UserStats({ user }) {
  const stats = [
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
    { label: "Public repos", value: user.public_repos },
  ];
  return (
    <section className="stats">
      {stats.map((s) => (
        <div className="card stat" key={s.label}>
          <span className="stat-value">{s.value.toLocaleString()}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  );
}
