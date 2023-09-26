let nameH1;
let climateSpan; 
let diameterSpan; 
let gravitySpan; 
const baseUrl = `https://swapi2.azurewebsites.net/api`;

sp = new URLSearchParams(window.location.search);
const id = sp.get('id'); 
console.log(id)

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    diameterSpan = document.querySelector('span#diameter');
    gravitySpan = document.querySelector('span#gravity');

    getPlanet(id)
  });
  

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      console.log(planet)
      planet.characters = await fetchCharacters(planet)
      console.log(planet.characters)
    //   character.films = await fetchFilms(character)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
}

async function fetchPlanet(id) {
    return await fetch( `${baseUrl}/planets/${id}`)
      .then(res => res.json())
}

async function fetchCharacters(id) {
    const url = `${baseUrl}/characters/`;
    const films = await fetch(url)
      .then(res => res.json())
    return films
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    diameterSpan.textContent = planet?.diameter;
    gravitySpan.textContent = planet?.gravity;
    // homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    // const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    // filmsUl.innerHTML = filmsLis.join("");
  }