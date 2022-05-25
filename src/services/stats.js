import { checkError, client } from './client';

export async function getSurvivorStatsByUserId(user) {
  const resp = await client.from('survivor_stats').select('*').match({ user_id: user });
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
