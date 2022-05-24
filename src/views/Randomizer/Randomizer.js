/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { getSurvivorPerks } from '../../services/data';
import PerkCard from '../../components/PerkCard/PerkCard';
import { randomPerks } from '../../services/utils';
import './Randomizer.css';

export default function Randomizer() {
  const [survivorPerk1, setSurvivorPerk1] = useState({});
  const [survivorPerk2, setSurvivorPerk2] = useState({});
  const [survivorPerk3, setSurvivorPerk3] = useState({});
  const [survivorPerk4, setSurvivorPerk4] = useState({});
  const [perks, setPerks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    </>
  );
}
