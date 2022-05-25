import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <button>
        <Link to="/survivor">Survivor Randomizer</Link>
      </button>
      <button>
        <Link to="/killer">Killer Randomizer</Link>
      </button>
      <Auth isSigningUp />
    </div>
  );
}
