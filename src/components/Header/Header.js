import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const { user } = useUser();
  const message = user.id ? (
    `${user.email}`
  ) : (
    <>
      <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link>
    </>
  );
  return (
    <>
      <div className="header">
        <img className="header-image" alt="" src={`${process.env.PUBLIC_URL}/assets/logo.jpg`} />
        <h1>Dead by Daylight Perk Stats</h1>
        <h2>{message}</h2>
      </div>
    </>
  );
}
