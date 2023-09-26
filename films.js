let nameH1;
let episodeSpan;
let directorSpan;
let producerSpan;
const baseUrl = 'https://swapi2.azurewebsites.net/api/';

// const sp = new URLSearchParams(window.location.search);
// // grab the "id" parameter from query string
// const id = sp.get('id');
// console.log(id)

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    episodeSpan = document.querySelector('span#episode')
    directorSpan = document.querySelector('span#director')
    producerSpan = document.querySelector('span#producer')
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(film)
        film.planets = await fetchPlanets(film)
        console.log(film)
        console.log("Character List", film.characters)
        console.log("Planet List", film.planets)
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);

}

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
        .then(res => res.json())
}  


// list of characters
async function fetchCharacters(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    return characters;
}

//list of planets
async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
  }


const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say the film name
    nameH1.textContent = film?.title;
    episodeSpan.textContent = film?.episode_id;
    directorSpan.textContent = film?.director;
    producerSpan.textContent = film?.producer;
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
    const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsLis.join("");
}

  









// async function getFilm(id) {
//     let character;
//     try {
//       character = await fetchFilm(id)
//     //   character.homeworld = await fetchHomeworld(character)
//     //   character.films = await fetchFilms(character)
//     //   character.planets = await fetchPlanets(character)
//     }
//     catch (ex) {
//       console.error(`Error reading character ${id} data.`, ex.message);
//     }
//     // renderCharacter(character);
// }

// async function fetchFilm(id) {
//     return await fetch( `${baseUrl}/films/${id}`)
//         .then(res => res.json())
// }

