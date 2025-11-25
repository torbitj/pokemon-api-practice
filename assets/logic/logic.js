const state = {
  starters: []
}

const API = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=9`;
const $app = document.querySelector('#app');

const getStarterPokemon = async () => {
  const response = await fetch(API);
  const pokemonData = await response.json();
  const starters = pokemonData.results;
  state.starters = starters;
  console.log(state.starters);
}

RendorPokemonLists = () => {
  const $section = document.createElement(`section`);
  $section.id = `starter-lists`
  $section.innerHTML = `
  <figure>
    <h2>Grass</h2>
    <GrassList></GrassList>
  </figure>
  <figure>
    <h2>Fire</h2>
    <FireList></FireList>
  </figure>
  <figure>
    <h2>Water</h2>
    <WaterList></WaterList>
  </figure>`;

}

RendorPokemonLists();
getStarterPokemon();