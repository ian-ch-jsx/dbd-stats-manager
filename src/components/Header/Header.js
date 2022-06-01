import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const { user } = useUser();
  const history = useHistory();

  const handleLogout = async () => {
    signOutUser();
    history.push('/');
  };

  const message = user.id ? (
    <button onClick={handleLogout}>Sign Out</button>
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

        <h1>Dead by Daylight Perk Stats</h1>

        <span>
          <h2>{message}</h2>
        </span>
      </div>
    </>
  );
}
