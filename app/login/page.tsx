"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);

    if (username.trim() === "client" && password === "client") {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Try client / client.");
    }
  }

  return (
    <div className="page login-page">
      <Header />

      <main className="main login-main">
        <div className="login-card">
          <div className="login-header">
            <span className="login-label">Client Access</span>
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">
              Enter your credentials to view project blueprints and
              deliverables.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="client"
                required
                autoComplete="username"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading || !username || !password}
            >
              {loading ? "Please wait…" : "Continue"}
            </button>

            {error && <span className="login-message login-error">{error}</span>}
          </form>

          <a href="/" className="login-back">
            Return to home
          </a>
        </div>
      </main>
    </div>
  );
}
