import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getKillerStatsByUserId, getSurvivorStatsByUserId } from '../../services/stats';
import Auth from '../Auth/Auth';
import FadeIn from 'react-fade-in/lib/FadeIn';
import './Profile.css';

export default function Profile({ isKiller = false }) {
  const { user } = useUser();
  const [topKiller, setTopKiller] = useState([]);
  const [topSurvivor, setTopSurvivor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const killerData = await getKillerStatsByUserId(user.id);
      const survivorData = await getSurvivorStatsByUserId(user.id);
      setTopKiller(killerData);
      setTopSurvivor(survivorData);
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  if (loading) return 'loading...';
  return (
    <FadeIn>
      <div className="stats-container">
        {user.id ? (
          <div className="home-container">
            <button>
              <Link to="/stats/survivor">Survivor Statistics</Link>
            </button>
            <button>
              <Link to="/stats/killer">Killer Statistics</Link>
            </button>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </FadeIn>
  );
}
