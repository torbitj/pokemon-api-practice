const state = {
  starters: []
}

const API = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=9`

const getStarterPokemon = async () => {
  const response = await fetch(API);
  const pokemonData = await response.json();
  const starters = pokemonData.results;
  state.starters = starters;
  console.log(state.starters);
}

getStarterPokemon();