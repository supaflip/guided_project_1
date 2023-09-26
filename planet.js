let nameH1;
let climateSpan; 
let diameterSpan; 
let gravitySpan; 
let characterUl; 
let filmsUl; 
const baseUrl = `https://swapi2.azurewebsites.net/api`;

sp = new URLSearchParams(window.location.search);
const id = sp.get('id'); 

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    diameterSpan = document.querySelector('span#diameter');
    gravitySpan = document.querySelector('span#gravity');
    characterUl = document.querySelector('#characters>ul')
    filmsUl = document.querySelector('#films>ul')


    getPlanet(id)
  });
  

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(id)
      planet.films = await fetchFilms(id)
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
    const url = `${baseUrl}/planets/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters
}

async function fetchFilms(id) {
    const url = `${baseUrl}/planets/${id}/films`;
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
    const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    characterUl.innerHTML = characterLis.join("");
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
  }