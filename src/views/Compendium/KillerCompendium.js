import { useState, useEffect } from 'react';
import PerkCard from '../PerkCard/PerkCard';
import { getKillerPerks } from '../../services/data';

export default function KillerCompendium() {
  const [perks, setPerks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKillerPerks();
      setPerks(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <div className="comp-container">
        {perks.map((perk) => (
          <PerkCard key={perk.id} {...perk} />
        ))}
      </div>
    </>
  );
}
