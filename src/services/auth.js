import { client } from './client';

export function getUser() {
  return client.auth.user();
}

export async function signUpUser(email, password) {
  const req = await client.auth.signUp({ email, password });
  return req;
}

export async function signInUser(email, password) {
  const req = await client.auth.signIn({ email, password });
  return req;
}

export async function signOutUser() {
  return client.auth.signOut();
}
