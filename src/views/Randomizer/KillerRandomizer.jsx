/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getKillerPerks,
  getKillers,
  getKillerPerkById,
  getKillerByName,
} from '../../services/data';
import { updateKillerStatsById, getKillerStatID, insertKillerStats } from '../../services/stats';
import { randomPerks } from '../../services/utils';
import { useUser } from '../../context/UserContext';
import PerkCard from '../../components/PerkCard/PerkCard';
import uuid from 'react-uuid';
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

export default function KillerRandomizer() {
  const [killerPerk1, setKillerPerk1] = useState({});
  const [killerPerk2, setKillerPerk2] = useState({});
  const [killerPerk3, setKillerPerk3] = useState({});
  const [killerPerk4, setKillerPerk4] = useState({});
  const [killerList, setKillerList] = useState([]);
  const [killer, setKiller] = useState({ name: 'Trapper' });
  const [perkList, setPerkList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKillerPerks();
      const killers = await getKillers();
      let perks = randomPerks(data);
      setPerkList(data);
      setKillerList(killers);
      setKiller(killers[0]);
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
        const statId = await getKillerStatID({
          perk_id: perk.ID,
          user_id: user.id,
          killer: killer.name,
        });
        const increment = statId.wins + 1;
        await updateKillerStatsById({ id: statId.id, wins: increment });
      } catch (error) {
        await insertKillerStats({
          user_id: user.id,
          perk_id: perk.ID,
          wins: 1,
          losses: 0,
          killer: killer.name,
        });
      }
    }
  };

  const handleLoss = async () => {
    for (let perk of perkArray) {
      try {
        const statId = await getKillerStatID({
          perk_id: perk.ID,
          user_id: user.id,
          killer: killer.name,
        });
        const increment = statId.losses + 1;
        await updateKillerStatsById({ id: statId.id, losses: increment });
      } catch (error) {
        await insertKillerStats({
          user_id: user.id,
          perk_id: perk.ID,
          wins: 0,
          losses: 1,
          killer: killer.name,
        });
      }
    }
  };

  const handlePerkSelect = async (perk, id) => {
    let setPerk = await getKillerPerkById(id);
    perk(setPerk);
  };

  const handleSetKiller = async (killer, killerName) => {
    let setKiller = await getKillerByName(killerName);
    killer(setKiller);
  };

  if (loading) return <h1>loading...</h1>;
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="perk-row-1">
        <div className="perk-card">
          <PerkCard {...killerPerk1} />
          <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
            <InputLabel id="perk1">select</InputLabel>
            <Select
              labelId="perk1"
              label="select"
              onChange={(e) => handlePerkSelect(setKillerPerk1, e.target.value)}
            >
              {perkList.map((perk) => (
                <MenuItem selected key={uuid()} value={perk.ID}>
                  {perk.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="perk-card">
          <PerkCard {...killerPerk2} />
          <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
            <InputLabel id="perk2">select</InputLabel>
            <Select
              labelId="perk2"
              label="select"
              onChange={(e) => handlePerkSelect(setKillerPerk2, e.target.value)}
            >
              {perkList.map((perk) => (
                <MenuItem key={uuid()} value={perk.ID}>
                  {perk.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="perk-row-2">
        <div className="perk-card">
          <PerkCard {...killerPerk3} />
          <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
            <InputLabel id="perk3">select</InputLabel>
            <Select
              labelId="perk3"
              label="select"
              onChange={(e) => handlePerkSelect(setKillerPerk3, e.target.value)}
            >
              {perkList.map((perk) => (
                <MenuItem key={uuid()} value={perk.ID}>
                  {perk.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="perk-card">
          <PerkCard {...killerPerk4} />
          <FormControl sx={{ minWidth: 120 }} size="small" variant="standard">
            <InputLabel id="perk4">select</InputLabel>
            <Select
              labelId="perk4"
              label="select"
              onChange={(e) => handlePerkSelect(setKillerPerk4, e.target.value)}
              variant="standard"
            >
              {perkList.map((perk) => (
                <MenuItem key={uuid()} value={perk.ID}>
                  {perk.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {user.id ? (
        <div className="killer-select">
          <span>Set Killer : </span>
          <FormControl size="small">
            <Select
              onChange={(e) => handleSetKiller(setKiller, e.target.value)}
              value={killer.name}
              variant="standard"
            >
              {killerList.map((killer) => (
                <MenuItem key={uuid()} value={killer.name}>
                  {killer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : (
        ''
      )}
      <div className="controls-container">
        <button className="controls" onClick={handleSubmit}>
          Random
        </button>
        {user.id ? (
          <>
            <button className="controls" onClick={handleWin}>
              Entity Pleased
            </button>
            <button className="controls" onClick={handleLoss}>
              Entity Displeased
            </button>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="auth-link">
        {user.id ? '' : <Link to="/signin">Sign in to save your stats.</Link>}
      </div>
    </ThemeProvider>
  );
}
