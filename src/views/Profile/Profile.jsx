import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getKillerPerks, getSurvivorPerks } from '../../services/data';
import { getKillerStatsByUserId } from '../../services/stats';

export default function Profile() {
  const { user } = useUser();
  const [topKiller, setTopKiller] = useState([]);
  const [topSurvivor, setTopSurvivor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const survivorPerks = await getSurvivorPerks();
      const killerPerks = await getKillerPerks();
      const data = await getKillerStatsByUserId(user.id);
      setTopKiller(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      TEST <p>{topKiller.perk_id}</p>
    </div>
  );
}
