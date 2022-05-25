/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { getSurvivorPerkById, getSurvivorPerks } from '../../services/data';
import {
  updateSurvivorStatsById,
  getSurvivorStatsByUserId,
  incrementWins,
  getSurvivorStatsByPerk,
} from '../../services/stats';
import PerkCard from '../../components/PerkCard/PerkCard';
import { randomPerks } from '../../services/utils';
import './Randomizer.css';
import { useUser } from '../../context/UserContext';

export default function Randomizer() {
  const [survivorPerk1, setSurvivorPerk1] = useState({});
  const [survivorPerk2, setSurvivorPerk2] = useState({});
  const [survivorPerk3, setSurvivorPerk3] = useState({});
  const [survivorPerk4, setSurvivorPerk4] = useState({});
  const [perks, setPerks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSurvivorPerks();
      let perks = randomPerks(data);
      setSurvivorPerk1(perks[0]);
      setSurvivorPerk2(perks[1]);
      setSurvivorPerk3(perks[2]);
      setSurvivorPerk4(perks[3]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    randomPerks(perks);
  };

  const handleWin = async () => {
    try {
      const perk = await getSurvivorStatsByPerk({ user_id: user.id, perk_id: survivorPerk1.ID });
      const increment = perk.wins + 1;
      updateSurvivorStatsById({ user_id: user.id, perk_id: survivorPerk1.ID, wins: increment });
    } catch (error) {
      updateSurvivorStatsById({ user_id: user.id, perk_id: survivorPerk1.ID, wins: 1 });
    }
  };

  const handleLoss = () => {
    updateSurvivorStatsById({
      perk_id: survivorPerk1.ID,
      user_id: user.id,
    });
  };

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <div className="perk-row-1">
        <PerkCard {...survivorPerk1} />
        <PerkCard {...survivorPerk2} />
      </div>
      <div className="perk-row-2">
        <PerkCard {...survivorPerk3} />
        <PerkCard {...survivorPerk4} />
      </div>
      <button onClick={handleSubmit}>roll</button>
      <button onClick={handleWin}>Escaped</button>
      <button onClick={handleLoss}>Sacrificed</button>
    </>
  );
}
