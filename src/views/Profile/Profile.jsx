import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getKillerStatsByUserId, getSurvivorStatsByUserId } from '../../services/stats';
import Auth from '../Auth/Auth';
import './Profile.css';

export default function Profile() {
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
          <span>
            <h1>Killer</h1>
            <p>
              {topKiller.map((perk) => (
                <>
                  <h3>{perk.perk_id.name}</h3>
                  <p>wins: {perk.wins}</p>
                  <p>losses: {perk.losses}</p>
                </>
              ))}
            </p>
          </span>
          <span>
            <h1>Survivor</h1>
            <p>
              {topSurvivor.map((perk) => (
                <>
                  <h3>{perk.perk_id.name}</h3>
                  <p>wins: {perk.wins}</p>
                  <p>losses: {perk.losses}</p>
                </>
              ))}
            </p>
          </span>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}
