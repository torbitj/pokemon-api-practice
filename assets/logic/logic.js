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

const getSelectedPokemon = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  const pokemonData = await response.json();
  state.selectedPokemon = pokemonData;
  RendorSelectedPokemon();
  console.log(state.selectedPokemon);
}

const PokemonIdName = () => {
  const $h2 = document.createElement(`h2`);
  const { name, id } = state.selectedPokemon;
  $h2.innerText = `Pokédex Number: 00${id} ${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  return $h2;
}

const PokemonImg = () => {
  const $img = document.createElement(`img`);
  $img.alt = state.selectedPokemon.name + `facing front`;
  $img.src = state.selectedPokemon.sprites.other[`official-artwork`].front_default;
  return $img;
}

const PokemonStat = (stat) => {
  const $p = document.createElement(`p`);
  $p.innerText = `${stat.stat.name.charAt(0).toUpperCase()}${stat.stat.name.slice(1)}: ${stat.base_stat}`;
  return $p;
}

const PokemonStats = () => {
  const $figure = document.createElement(`figure`);
  $figure.id = `pokemon-stats`;
  state.selectedPokemon.stats.forEach((stat) => {
    $figure.append(PokemonStat(stat));
  });
  return $figure;
}

const PokemonListItem = (pokemon) => {
  const $li = document.createElement(`li`);
  const upperCaseName = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
  $li.innerText = upperCaseName;
  $li.addEventListener(`click`, () => {
    getSelectedPokemon(pokemon.url);
  })
  return $li;
}

const PokemonList = (type) => {
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
    $ul.append(PokemonListItem(pokemon));
  })
  return $ul;
}

const RendorSelectedPokemon = () => {
  const $pokemonLists = document.querySelector(`#starter-lists`);
  $app.removeChild($pokemonLists);
  const $section = document.createElement(`section`);
  $section.id = `selected-pokemon`;
  $section.innerHTML = `
  <IdName></IdName>
  <PokemonImg></PokemonImg>
  <PokemonStats></PokemonStats>
  <button>Go Back</button>
  `;

  const backButton = $section.querySelector(`button`);
  backButton.addEventListener(`click`, RendorPokemonLists);
  $section.querySelector(`IdName`).replaceWith(PokemonIdName());
  $section.querySelector(`PokemonImg`).replaceWith(PokemonImg());
  $section.querySelector(`PokemonStats`).replaceWith(PokemonStats());
  

  $app.append($section);
}

const RendorPokemonLists = () => {
  const $selectedPokemon = document.querySelector(`#selected-pokemon`);
  if ($selectedPokemon) {
    $app.removeChild($selectedPokemon);
  }
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

  $section.querySelector(`GrassList`).replaceWith(PokemonList(`grass`));
  $section.querySelector(`FireList`).replaceWith(PokemonList(`fire`));
  $section.querySelector(`WaterList`).replaceWith(PokemonList(`water`));

  $app.append($section);
}

const init = async () => {
  await getStarterPokemon();
  RendorPokemonLists();
}

init();