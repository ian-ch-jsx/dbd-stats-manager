import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <button>
        <Link to="/survivor">Survivor Randomizer</Link>
      </button>
      <button>
        <Link to="/killer">Killer Randomizer</Link>
      </button>
    </div>
  );
}
