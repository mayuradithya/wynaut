"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setMessage("Access request sent.");
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
              Enter your credentials to view private galleries and project
              timelines.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                required
                autoComplete="email"
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
              disabled={loading || !email || !password}
            >
              {loading ? "Please wait…" : "Continue"}
            </button>

            {message && <span className="login-message">{message}</span>}
          </form>

          <a href="/" className="login-back">
            Return to home
          </a>
        </div>
      </main>
    </div>
  );
}
