export function randomPerks(data) {
  let random1 = data[Math.floor(Math.random() * data.length)];
  let random2 = data[Math.floor(Math.random() * data.length)];
  let random3 = data[Math.floor(Math.random() * data.length)];
  let random4 = data[Math.floor(Math.random() * data.length)];

  while (
    random1 === random2 ||
    random1 === random3 ||
    random1 === random4 ||
    random2 === random3 ||
    random2 === random4 ||
    random3 === random4
  ) {
    random1 = Math.floor(Math.random() * data.length);
    random2 = Math.floor(Math.random() * data.length);
    random3 = Math.floor(Math.random() * data.length);
    random4 = Math.floor(Math.random() * data.length);
  }
  return [random1, random2, random3, random4];
}
