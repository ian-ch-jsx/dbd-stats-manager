import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in/lib/FadeIn';
import './Home.css';

export default function Home() {
  return (
    <FadeIn>
      <div className="home-container">
        <button>
          <Link to="/survivor">Survivor Perks</Link>
        </button>
        <button>
          <Link to="/killer">Killer Perks</Link>
        </button>
      </div>
    </FadeIn>
  );
}
