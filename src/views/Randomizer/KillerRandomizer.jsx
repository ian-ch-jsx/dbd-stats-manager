/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { getKillerPerks } from '../../services/data';
import { updateKillerStatsById, getKillerStatsByPerk } from '../../services/stats';
import { randomPerks } from '../../services/utils';
import { useUser } from '../../context/UserContext';
import PerkCard from '../../components/PerkCard/PerkCard';
import './Randomizer.css';

export default function KillerRandomizer() {
  const [killerPerk1, setKillerPerk1] = useState({});
  const [killerPerk2, setKillerPerk2] = useState({});
  const [killerPerk3, setKillerPerk3] = useState({});
  const [killerPerk4, setKillerPerk4] = useState({});
  const [perkList, setPerkList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKillerPerks();
      let perks = randomPerks(data);
      setPerkList(data);
      setKillerPerk1(perks[0]);
      setKillerPerk2(perks[1]);
      setKillerPerk3(perks[2]);
      setKillerPerk4(perks[3]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    let perks = randomPerks(perkList);
    setKillerPerk1(perks[0]);
    setKillerPerk2(perks[1]);
    setKillerPerk3(perks[2]);
    setKillerPerk4(perks[3]);
  };

  const perkArray = [killerPerk1, killerPerk2, killerPerk3, killerPerk4];

  const handleWin = async () => {
    for (let perk of perkArray) {
      try {
        const stat = await getKillerStatsByPerk({ user_id: user.id, perk_id: perk.ID });
        const increment = stat.wins + 1;
        await updateKillerStatsById({ user_id: user.id, perk_id: perk.ID, wins: increment });
      } catch (error) {
        await updateKillerStatsById({ user_id: user.id, perk_id: perk.ID, wins: 1 });
      }
    }
  };

  const handleLoss = async () => {
    for (let perk of perkArray) {
      try {
        const stat = await getKillerStatsByPerk({ user_id: user.id, perk_id: perk.ID });
        const increment = stat.losses + 1;
        await updateKillerStatsById({ user_id: user.id, perk_id: perk.ID, losses: increment });
      } catch (error) {
        await updateKillerStatsById({ user_id: user.id, perk_id: perk.ID, losses: 1 });
      }
    }
  };

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <div className="perk-row-1">
        <div className="perk-card">
          <PerkCard {...killerPerk1} />
          {/* <select value={perkList.perk} onChange={(e) => setKillerPerk1(e.target.value)}>
            <option>Select...</option>
            {perkList.map((perk) => (
              <option key={uuid()} value={perk}>
                {perk.name}
              </option>
            ))}
          </select> */}
        </div>
        <div className="perk-card">
          <PerkCard {...killerPerk2} />
        </div>
      </div>
      <div className="perk-row-2">
        <div className="perk-card">
          <PerkCard {...killerPerk3} />
        </div>
        <div className="perk-card">
          <PerkCard {...killerPerk4} />
        </div>
      </div>
      <button onClick={handleSubmit}>roll</button>
      <button onClick={handleWin}>Escaped</button>
      <button onClick={handleLoss}>Sacrificed</button>
    </>
  );
}
