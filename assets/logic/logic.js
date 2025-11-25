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

const pokemonListItem = (pokemonName) => {
  const $li = document.createElement(`li`);
  const upperCaseName = `${pokemonName.charAt(0).toUpperCase()}${pokemonName.slice(1)}`;
  $li.innerText = upperCaseName;
  return $li;
}

const pokemonList = (type) => {
  const $ul = document.createElement(`ul`);
  let pokemonLIs = []
  if (type === `grass`) {
    pokemonLIs = state.starters.slice(0, 3);
    console.log(pokemonLIs)
  } else if (type === `fire`) {
    pokemonLIs = state.starters.slice(3, 6);
    console.log(pokemonLIs)
  } else {
    pokemonLIs = state.starters.slice(6, 9);
    console.log(pokemonLIs)
  }
  pokemonLIs.forEach((pokemon) => {
    $ul.append(pokemonListItem(pokemon.name));
  })
  return $ul;
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