import { Link } from 'react-router-dom';
import './Home.css';

const POSTERS = [
  { emoji: '🎬', delay: '0s', duration: '18s', left: '5%' },
  { emoji: '🎥', delay: '3s', duration: '22s', left: '15%' },
  { emoji: '🍿', delay: '1s', duration: '20s', left: '28%' },
  { emoji: '🎞️', delay: '5s', duration: '25s', left: '42%' },
  { emoji: '🎭', delay: '2s', duration: '19s', left: '58%' },
  { emoji: '🎬', delay: '7s', duration: '23s', left: '70%' },
  { emoji: '⭐', delay: '4s', duration: '21s', left: '82%' },
  { emoji: '🎥', delay: '6s', duration: '17s', left: '92%' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Floating background icons */}
      <div className="home-bg">
        {POSTERS.map((p, i) => (
          <span
            key={i}
            className="float-icon"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="home-content">
        <div className="home-badge">Now Streaming</div>
        <h1 className="home-title">
          <span>M</span><span>F</span><span>l</span><span>i</span><span>x</span>
        </h1>
        <p className="home-sub">Your personal movie universe. Explore, discover, enjoy.</p>
        <div className="home-actions">
          <Link to="/login"><button className="btn-primary">Get Started</button></Link>
          <Link to="/register"><button className="btn-ghost">Create Account</button></Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="home-fade" />
    </div>
  );
}
