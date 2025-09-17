const apiBase = "https://pokeapi.co/api/v2/pokemon";
let allPokemons = [];
let shown = [];
let pokeIndex = 0;

const First_Loading_Pokemons = 50;
const More_Pokemons_Loading = 50;

async function fetchList(offset, size = More_Pokemons_Loading) {
  const url = `${apiBase}?offset=${offset}&limit=${size}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function loadPokemons(list) {
  for (let i = 0; i < list.length; i++) {
    try {
      const response = await fetch(list[i].url);
      if (response.ok) {
        let p = await response.json();
        allPokemons.push(p);
      }
    } catch (error) {
      console.error("Fehler Poke", i, error);
    }
  }
}
