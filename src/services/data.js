import { checkError, client } from './client';

export async function getSurvivorPerks() {
  const resp = await client.from('survivor_perks').select('*').order('name');
  return checkError(resp);
}

export async function getKillerPerks() {
  const resp = await client.from('killer_perks').select('*').order('name');
  return checkError(resp);
}

export async function getKillers() {
  const resp = await client.from('killers').select('name');
  return checkError(resp);
}

export async function getSurvivorPerkById(ID) {
  const resp = await client.from('survivor_perks').select('*').match({ ID }).single();
  return checkError(resp);
}

export async function getKillerPerkById(ID) {
  const resp = await client.from('killer_perks').select('*').match({ ID }).single();
  return checkError(resp);
}
