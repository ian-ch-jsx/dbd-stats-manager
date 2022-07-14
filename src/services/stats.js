import { checkError, client } from './client';

export async function getSurvivorStatsByUserId(user) {
  const resp = await client
    .from('survivor_stats')
    .select(`id, wins, losses, perk_id:perk_id ( name ) `)
    .match({ user_id: user })
    .order('wins', { ascending: false });
  return checkError(resp);
}

export async function getSurvivorStatsByPerk({ user_id, perk_id }) {
  const resp = await client.from('survivor_stats').select('*').match({ user_id, perk_id }).single();
  return checkError(resp);
}

export async function updateSurvivorStatsById({ perk_id, wins, losses, user_id }) {
  const resp = await client
    .from('survivor_stats')
    .upsert({ perk_id, wins, losses, user_id }, { onConflict: 'perk_id' });
  return checkError(resp);
}

export async function getKillerStatsByUserId(user) {
  const resp = await client
    .from('killer_stats')
    .select(`id, wins, losses, perk_id:perk_id ( name, image ) `)
    .match({ user_id: user })
    .order('wins', { ascending: false });
  return checkError(resp);
}

export async function getKillerStatsByPerk({ user_id, perk_id }) {
  const resp = await client.from('killer_stats').select('*').match({ user_id, perk_id }).single();
  return checkError(resp);
}

export async function insertKillerStats({ perk_id, wins, losses, user_id, killer }) {
  const resp = await client
    .from('killer_stats')
    .insert([{ perk_id, wins, losses, user_id, killer }]);
  return checkError(resp);
}

export async function updateKillerStatsById({ id, wins, losses }) {
  const resp = await client.from('killer_stats').update({ wins, losses }).match({ id });
  return checkError(resp);
}

export async function getKillerStatID({ perk_id, user_id, killer }) {
  const resp = await client
    .from('killer_stats')
    .select('*')
    .match({ perk_id: perk_id, killer: killer, user_id: user_id })
    .single();
  return checkError(resp);
}
