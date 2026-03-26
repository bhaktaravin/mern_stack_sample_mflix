import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center', gap: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#fff' }}>🎬 MFlix</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
          Your personal movie database. Login to get started.
        </p>
        <Link to="/login">
          <button style={{ width: '100%' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
}
