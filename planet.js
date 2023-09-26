const baseUrl = `https://swapi2.azurewebsites.net/api`;

sp = new URLSearchParams(window.location.search);
const id = sp.get('id'); 
console.log(id)

addEventListener('DOMContentLoaded', () => {
    let test = getPlanet(id)
  });
  

async function getPlanet(id) {
    let character;
    try {
      character = await fetchPlanet(id)
    //   character.homeworld = await fetchHomeworld(character)
    //   character.films = await fetchFilms(character)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    // renderCharacter(character);
  
}

async function fetchPlanet(id) {
    return await fetch( `${baseUrl}/characters/${id}`)
      .then(res => res.json())
}