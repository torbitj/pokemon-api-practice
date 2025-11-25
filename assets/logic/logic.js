const state = {
  starters: [],
  selectedPokemon: {}
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

const pokemonListItem = (pokemon) => {
  const $li = document.createElement(`li`);
  const upperCaseName = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
  $li.innerText = upperCaseName;
  $li.addEventListener(`click`, () => {
    state.selectedPokemon = pokemon.url;
  })
  return $li;
}

const pokemonList = (type) => {
  const $ul = document.createElement(`ul`);
  let pokemonLIs = []
  if (type === `grass`) {
    pokemonLIs = state.starters.slice(0, 3);
  } else if (type === `fire`) {
    pokemonLIs = state.starters.slice(3, 6);
  } else {
    pokemonLIs = state.starters.slice(6, 9);
  }
  pokemonLIs.forEach((pokemon) => {
    $ul.append(pokemonListItem(pokemon));
  })
  return $ul;
}

RendorPokemonLists = () => {
  const $section = document.createElement(`section`);
  $section.id = `starter-lists`;
  $section.innerHTML = `
  <figure id="grass">
    <h2>Grass</h2>
    <GrassList></GrassList>
  </figure>
  <figure id="fire">
    <h2>Fire</h2>
    <FireList></FireList>
  </figure>
  <figure id="water">
    <h2>Water</h2>
    <WaterList></WaterList>
  </figure>`;

  $section.querySelector(`GrassList`).replaceWith(pokemonList(`grass`));
  $section.querySelector(`FireList`).replaceWith(pokemonList(`fire`));
  $section.querySelector(`WaterList`).replaceWith(pokemonList(`water`));

  $app.append($section);
}

const init = async () => {
  await getStarterPokemon();
  RendorPokemonLists();
}

init();