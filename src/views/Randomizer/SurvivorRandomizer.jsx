/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSurvivorPerkById, getSurvivorPerks } from '../../services/data';
import { updateSurvivorStatsById, getSurvivorStatsByPerk } from '../../services/stats';
import { randomPerks } from '../../services/utils';
import { useUser } from '../../context/UserContext';
import PerkCard from '../../components/PerkCard/PerkCard';
import uuid from 'react-uuid';
import FadeIn from 'react-fade-in/lib/FadeIn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Randomizer.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    };
    fetchData();
    setLoading(false);
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

  const handlePerkSelect = async (perk, id) => {
    let setPerk = await getSurvivorPerkById(id);
    perk(setPerk);
  };

  if (loading) return <h1>loading...</h1>;
  return (
    <ThemeProvider theme={darkTheme}>
      <FadeIn>
        <span className="tabs">
          <Link to="/killer">
            <h2>killer</h2>
          </Link>
          <h1>Survivor</h1>
        </span>
        <div className="perk-row-1">
          <span className="perk-card">
            <PerkCard {...survivorPerk1} />
            <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
              <InputLabel id="perk1">select</InputLabel>
              <Select
                labelId="perk1"
                label="select"
                onChange={(e) => handlePerkSelect(setSurvivorPerk1, e.target.value)}
              >
                {perkList.map((perk) => (
                  <MenuItem key={uuid()} value={perk.ID}>
                    {perk.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
          <span className="perk-card">
            <PerkCard {...survivorPerk2} />
            <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
              <InputLabel id="perk2">select</InputLabel>
              <Select
                labelId="perk2"
                label="select"
                onChange={(e) => handlePerkSelect(setSurvivorPerk2, e.target.value)}
              >
                {perkList.map((perk) => (
                  <MenuItem key={uuid()} value={perk.ID}>
                    {perk.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
        </div>
        <div className="perk-row-2">
          <span className="perk-card">
            <PerkCard {...survivorPerk3} />
            <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
              <InputLabel id="perk3">select</InputLabel>
              <Select
                labelId="perk3"
                label="select"
                onChange={(e) => handlePerkSelect(setSurvivorPerk3, e.target.value)}
              >
                {perkList.map((perk) => (
                  <MenuItem key={uuid()} value={perk.ID}>
                    {perk.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
          <span className="perk-card">
            <PerkCard {...survivorPerk4} />
            <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
              <InputLabel id="perk4">select</InputLabel>
              <Select
                labelId="perk4"
                label="select"
                onChange={(e) => handlePerkSelect(setSurvivorPerk4, e.target.value)}
              >
                {perkList.map((perk) => (
                  <MenuItem key={uuid()} value={perk.ID}>
                    {perk.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
        </div>
        <div className="controls-container">
          <button className="controls" onClick={handleSubmit}>
            Roulette
          </button>
          {user.id ? (
            <>
              <button className="controls" onClick={handleWin}>
                Escaped
              </button>
              <button className="controls" onClick={handleLoss}>
                Sacrificed
              </button>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="auth-link">
          {user.id ? '' : <Link to="/signin">Sign in to save your stats.</Link>}
        </div>
      </FadeIn>
    </ThemeProvider>
  );
}
