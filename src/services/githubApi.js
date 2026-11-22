const BASE = "https://api.github.com";

// One helper handles every request and turns failures into readable messages.
async function request(path, signal) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      signal,
      headers: { Accept: "application/vnd.github+json" },
    });
  } catch (err) {
    if (err.name === "AbortError") throw err; // cancelled on purpose, not a real error
    throw new Error("Network error. Check your connection and try again.");
  }
  if (res.status === 404) throw new Error("No GitHub user has that username. Check the spelling and try again.");
  if (res.status === 403 || res.status === 429) throw new Error("GitHub's rate limit was reached. Wait a few minutes and try again.");
  if (!res.ok) throw new Error(`GitHub returned an error (${res.status}). Try again later.`);
  return res.json();
}

export const fetchUser = (username, signal) =>
  request(`/users/${encodeURIComponent(username)}`, signal);

export const fetchRepos = (username, signal) =>
  request(`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`, signal);
