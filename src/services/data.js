import { checkError, client } from './client';

export async function getSurvivorPerks() {
  const resp = await client.from('survivor_perks').select('*').order('name');
  return checkError(resp);
}

export async function getKillerPerks() {
  const resp = await client.from('killer_perks').select('*').order('name');
  return checkError(resp);
}

export async function getSurvivorPerkById(ID) {
  const resp = await client.from('survivor_perks').select('*').match({ ID }).single();
  return checkError(resp);
}

//update stats
export async function updateSurvivorStatsById({ id, perk_id, wins, losses, user_id }) {
  const resp = await client
    .from('survivor_stats')
    .update({ perk_id, wins, losses })
    .match({ id })
    .eq('user.id', user_id);
  return checkError(resp);
}

//create stats
export async function createSurvivorStatsById({ perk_id, wins, losses, user_id }) {
  const resp = await client.from('survivor_stats').insert({ perk_id, wins, losses, user_id });
  return checkError(resp);
}
