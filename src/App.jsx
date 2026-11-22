import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UserStats from "./components/UserStats.jsx";
import RepositoryList from "./components/RepositoryList.jsx";
import Loading from "./components/Loading.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { fetchUser, fetchRepos } from "./services/githubApi.js";

export default function App() {
  const [searchTerm, setSearchTerm] = useState(""); // changes only on submit
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Runs once per submitted search, never per keystroke.
  useEffect(() => {
    if (!searchTerm) return;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [userData, repoData] = await Promise.all([
          fetchUser(searchTerm, controller.signal),
          fetchRepos(searchTerm, controller.signal),
        ]);
        setUser(userData);
        setRepos(repoData);
      } catch (err) {
        if (err.name === "AbortError") return; // a newer search replaced this one
        setUser(null);
        setRepos([]);
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();

    // Cleanup: cancels the old request if a new search starts first (no race conditions).
    return () => controller.abort();
  }, [searchTerm]);

  function handleSearch(name) {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a GitHub username to search.");
      return;
    }
    setError("");
    setSearchTerm(trimmed);
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <header className="hero">
          <h1>Find any GitHub profile</h1>
          <p>Search a username to see their profile and latest repositories.</p>
        </header>
        <SearchBar onSearch={handleSearch} disabled={loading} />
        {loading && <Loading />}
        {error && !loading && <ErrorMessage message={error} />}
        {user && !loading && (
          <>
            <UserProfile user={user} />
            <UserStats user={user} />
            <RepositoryList repos={repos} />
          </>
        )}
      </main>
    </>
  );
}
