import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../services/auth';
import { useHistory } from 'react-router-dom';
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
        <Link to="/profile">Your Stats</Link>
      </button>
      <button onClick={handleLogout}>Sign Out</button>
    </>
  ) : (
    <>
      <button>
        <Link to="/signin">Sign In</Link>
      </button>

      <button>
        <Link to="/signup">Sign Up</Link>
      </button>
    </>
  );
  return (
    <>
      <div className="header">
        <span>
          <img className="header-image" alt="" src={`${process.env.PUBLIC_URL}/assets/logo.jpg`} />
        </span>

        <h1>
          <Link to="/">Dead by Daylight Perk Stats</Link>
        </h1>

        <span>
          <h2>{message}</h2>
        </span>
      </div>
    </>
  );
}
