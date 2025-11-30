const state = {
  generation: null,
  starters: [],
  selectedPokemon: {}
}

const API = `https://pokeapi.co/api/v2/pokemon`;
const GEN1 = `?offset=0&limit=9`;
const GEN2 = `?offset=151&limit=9`;
const GEN3 = `?offset=251&limit=9`;
const $app = document.querySelector('#app');

const getStarterPokemon = async () => {
  const response = await fetch(API);
  const pokemonData = await response.json();
  const starters = pokemonData.results;
  state.starters = starters;
}

const getSelectedPokemon = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  const pokemonData = await response.json();
  state.selectedPokemon = pokemonData;
  RendorSelectedPokemon();
}

const PokemonName = () => {
  const $h2 = document.createElement(`h2`);
  const { name } = state.selectedPokemon;
  $h2.innerText = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  return $h2;
}

const PokemonImg = () => {
  const $img = document.createElement(`img`);
  $img.alt = state.selectedPokemon.name + `facing front`;
  $img.src = state.selectedPokemon.sprites.other[`official-artwork`].front_default;
  return $img;
}

const PokemonStat = (pokemonStat) => {
  const $p = document.createElement(`p`);
  if (pokemonStat.stat.name.length < 3) {
    $p.innerText = `${pokemonStat.stat.name.toUpperCase()}: ${pokemonStat.base_stat}`;
    return $p;
  }
  $p.innerText = `${pokemonStat.stat.name.charAt(0).toUpperCase()}${pokemonStat.stat.name.slice(1)}: ${pokemonStat.base_stat}`;
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
  <Name></Name>
  <PokemonImg></PokemonImg>
  <PokemonStats></PokemonStats>
  <button>Go Back</button>
  `;

  $section.querySelector(`Name`).replaceWith(PokemonName());
  $section.querySelector(`PokemonImg`).replaceWith(PokemonImg());
  $section.querySelector(`PokemonStats`).replaceWith(PokemonStats());
  const backButton = $section.querySelector(`button`);
  backButton.addEventListener(`click`, RendorPokemonLists);

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