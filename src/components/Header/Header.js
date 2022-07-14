import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in/lib/FadeIn';
import './Header.css';

export default function Header() {
  const { user, setUser } = useUser();
  const history = useHistory();

  const handleLogout = async () => {
    signOutUser();
    setUser({});
    history.push('/');
  };

  const message = user.id ? (
    <>
      <button>
        <Link to="/stats">Your Stats</Link>
      </button>
      | <button onClick={handleLogout}>Sign Out</button>
    </>
  ) : (
    <>
      <button>
        <Link to="/signin">Sign In</Link>
      </button>
      |
      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
    </>
  );
  return (
    <FadeIn>
      <div className="header">
        <span>
          <button>
            <Link to="/killer">Killer </Link>
          </button>
          |
          <button>
            <Link to="/survivor">Survivor </Link>
          </button>
        </span>

        <h1>
          <Link to="/">Dead by Daylight Perk Stats</Link>
        </h1>

        <span>{message}</span>
      </div>
    </FadeIn>
  );
}
