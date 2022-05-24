import { useUser } from '../../context/UserContext';
import './Header.css';

export default function Header() {
  const { user } = useUser();
  const message = user.id === true ? `login` : `${user.email}`;
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
