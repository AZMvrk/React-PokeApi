import { useEffect, useState } from 'react'
import LocationItem from './components/LocationItem'
import PokemonEncounter from './components/PokemonEncounter'
import './App.css'

function App() {

  /* const usersPokemonUrls = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
  ]; */

  
  const [locations, setLocations] = useState([])
  const [encounter, setEncounter] = useState(null);


  useEffect(() => {
    
    fetch('https://pokeapi.co/api/v2/location?limit=20')    // Fetch the first 20 locations from the PokéAPI
      .then((response) => {
        if (!response.ok) {
          throw new Error('The network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        //console.log(data)
        //console.log(data.results)
        setLocations(data.results)
      })
      .catch((error) => {
        console.error('Error in the fetch:', error)
      })
  }, [])


  function handleLocationClick(locationUrl) {
  
    fetch(locationUrl)
      .then(response => response.json())
      .then(locationDetails => {

        console.log("Location object: ", locationDetails)

        // To randomize a number cause it can be more than 1 area ===> Journey Hints
        const randomAreaIndex = Math.floor(Math.random() * locationDetails.areas.length)

        const areaUrl = locationDetails.areas[randomAreaIndex].url
        //console.log(areaUrl)

        return fetch(areaUrl)
      })
      .then(response => response.json())
      .then(areaDetails => {
        console.log("Area object: ", areaDetails)
        //console.log(areaDetails.pokemon_encounters)
        if (areaDetails.pokemon_encounters.length === 0) {           // If length is 0, no encounters available in the object
         
          setEncounter({
            message: "Oh noo! This location doesn't seem to have any Pokémon."
          })
        } else {
          
          // To randomize a number again cause it can be more than 1 encounter as well ===> Journey Hints
          const randomEncounterIndex = Math.floor(Math.random() * areaDetails.pokemon_encounters.length)

          const pokemonUrl = areaDetails.pokemon_encounters[randomEncounterIndex].pokemon.url
          //console.log(pokemonUrl)
        
          return fetch(pokemonUrl)
        }
      })
      .then(response => response.json())
      .then(pokemonDetails => {
        console.log(pokemonDetails)

        // Now here we can set the encountered Pokémon details
        setEncounter( {
          name: pokemonDetails.name,
          sprite: pokemonDetails.sprites.front_default   // sprite = picture of pokemon
        } )
      })
      .catch(error => {
        console.error('Error in the handleLocationClick:', error)
      })
  }

  
  
  console.log('The current encounter:', encounter);


  return (
    <div>

      {!encounter && (
        <h1>Locations</h1>
      )}

      {!encounter && (
      <ul>
        {locations.map((location) => (
          <LocationItem
            key={location.name}
            locationName={location.name}
            handleLocationClick={() => handleLocationClick(location.url)}
          />
        ))}
      </ul>
      )}


      {encounter && !encounter.message && (
        <PokemonEncounter
          name={encounter.name}
          sprite={encounter.sprite}
        />
      )}



      {encounter && encounter.message && (
        <div>
          <p>{encounter.message}</p>
          <button onClick={() => setEncounter(null)}>Back to locations</button>
        </div>
      )}



      {/* ... other components under construction */}
    </div>
  )
}

export default App
