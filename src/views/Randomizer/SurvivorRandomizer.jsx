/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { getSurvivorPerks } from '../../services/data';
import { updateSurvivorStatsById, getSurvivorStatsByPerk } from '../../services/stats';
import { randomPerks } from '../../services/utils';
import { useUser } from '../../context/UserContext';
import PerkCard from '../../components/PerkCard/PerkCard';
import './Randomizer.css';

export default function SurvivorRandomizer() {
  const [survivorPerk1, setSurvivorPerk1] = useState({});
  const [survivorPerk2, setSurvivorPerk2] = useState({});
  const [survivorPerk3, setSurvivorPerk3] = useState({});
  const [survivorPerk4, setSurvivorPerk4] = useState({});
  const [perkList, setPerkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSurvivorPerks();
      let perks = randomPerks(data);
      setPerkList(data);
      setSurvivorPerk1(perks[0]);
      setSurvivorPerk2(perks[1]);
      setSurvivorPerk3(perks[2]);
      setSurvivorPerk4(perks[3]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    let perks = randomPerks(perkList);
    setSurvivorPerk1(perks[0]);
    setSurvivorPerk2(perks[1]);
    setSurvivorPerk3(perks[2]);
    setSurvivorPerk4(perks[3]);
  };

  const perkArray = [survivorPerk1, survivorPerk2, survivorPerk3, survivorPerk4];

  const handleWin = async () => {
    for (let perk of perkArray) {
      try {
        const stat = await getSurvivorStatsByPerk({ user_id: user.id, perk_id: perk.ID });
        const increment = stat.wins + 1;
        await updateSurvivorStatsById({ user_id: user.id, perk_id: perk.ID, wins: increment });
      } catch (error) {
        await updateSurvivorStatsById({ user_id: user.id, perk_id: perk.ID, wins: 1 });
      }
    }
  };

  const handleLoss = async () => {
    for (let perk of perkArray) {
      try {
        const stat = await getSurvivorStatsByPerk({ user_id: user.id, perk_id: perk.ID });
        const increment = stat.losses + 1;
        await updateSurvivorStatsById({ user_id: user.id, perk_id: perk.ID, losses: increment });
      } catch (error) {
        await updateSurvivorStatsById({ user_id: user.id, perk_id: perk.ID, losses: 1 });
      }
    }
  };

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <div className="perk-row-1">
        <div className="perk-card">
          <PerkCard {...survivorPerk1} />
          {/* <select value={perkList} onChange={(e) => setSurvivorPerk1(e.target.value)}>
            <option>Select...</option>
            {perkList.map((perk) => (
              <option key={perk} value={perk}>
                {perk.name}
              </option>
            ))}
          </select> */}
        </div>
        <div className="perk-card">
          <PerkCard {...survivorPerk2} />
        </div>
      </div>
      <div className="perk-row-2">
        <div className="perk-card">
          <PerkCard {...survivorPerk3} />
        </div>
        <div className="perk-card">
          <PerkCard {...survivorPerk4} />
        </div>
      </div>
      <button onClick={handleSubmit}>roll</button>
      <button onClick={handleWin}>Escaped</button>
      <button onClick={handleLoss}>Sacrificed</button>
    </>
  );
}
