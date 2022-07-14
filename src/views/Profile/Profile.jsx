import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getKillerStatsByUserId, getSurvivorStatsByUserId } from '../../services/stats';
import Auth from '../Auth/Auth';
import './Profile.css';
import uuid from 'react-uuid';

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
    <div className="stats-container">
      {user.id ? (
        <>
          {isKiller ? (
            <span>
              <span className="tabs">
                <h1>Killer</h1>
                <Link to="/stats/survivor">
                  <h2> survivor</h2>
                </Link>
              </span>
              <span className="stats">
                {topKiller.map((perk) => (
                  <span className="card" key={uuid()}>
                    <h2>{perk.perk_id.name}</h2>

                    <p>wins: {perk.wins}</p>
                    <p>losses: {perk.losses}</p>
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span>
              <span className="tabs">
                <Link to="/stats/killer">
                  <h2> killer</h2>
                </Link>
                <h1>Survivor</h1>
              </span>
              <span className="stats">
                {topSurvivor.map((perk) => (
                  <span className="card" key={uuid()}>
                    <h2>{perk.perk_id.name}</h2>

                    <p>wins: {perk.wins}</p>
                    <p>losses: {perk.losses}</p>
                  </span>
                ))}
              </span>
            </span>
          )}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}
