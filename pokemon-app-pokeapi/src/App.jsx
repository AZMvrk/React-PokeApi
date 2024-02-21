import { useEffect, useState } from 'react'
import LocationItem from './components/LocationItem'
import PokemonEncounter from './components/PokemonEncounter'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Button } from '@mui/material'


function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })


  const [usersPokemonUrls, setUsersPokemonUrls] = useState([  //  changed it to state 
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ]); 

  
  const [locations, setLocations] = useState([])
  const [encounter, setEncounter] = useState(null)
  const [usersPokemons, setUsersPokemons] = useState([])

  const [isUserWon, setIsUserWon] = useState(false)     //  passed this to the PokemonEncounter
  const [isNewPokemonAdded, setIsNewPokemonAdded] = useState(false)
 

  useEffect(() => { // fetch the locations only
    
    fetch('https://pokeapi.co/api/v2/location?limit=20')    // Fetch the first 20 locations from the PokéAPI
      .then((response) => {
        if (!response.ok) {
          throw new Error('The network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setLocations(data.results)
      })

      .catch((error) => {
        console.error('Error in the fetch:', error)
      })
  }, [])


  useEffect(() => { // fetch the users pokemons
    Promise.all(usersPokemonUrls.map(url => fetch(url).then(res => res.json())))
    .then(pokemons => {
      setUsersPokemons(pokemons);
      setIsNewPokemonAdded(false)
    })
  },[isNewPokemonAdded])  // if new pokemon added run the fetch again


  useEffect(() => {
    if(isUserWon === true){ // if we won add the new url but keep the existing urls 
      console.log('User won the battle, this pokémon should be added to the users pokemons')
      setUsersPokemonUrls(usersPokemonUrls => [...usersPokemonUrls, `https://pokeapi.co/api/v2/pokemon/${encounter.name}`])
      setIsNewPokemonAdded(true)
      
    }
  }, [isUserWon])

  useEffect(() => {
    console.log(usersPokemonUrls)
  },[usersPokemonUrls])


  // ISSUES: we can't change back the isUserWon state to false cause it's gonna be an endless loop so we can add only one pokemon to our list. except if we lose a battle and that changes back the isUserWon state to false  


  function handleLocationClick(locationUrl) {
  
    fetch(locationUrl)
      .then(response => response.json())
      .then(locationDetails => {

        if(locationDetails.areas.length > 0){

          // To randomize a number cause it can be more than 1 area ===> Journey Hints
          const randomAreaIndex = Math.floor(Math.random() * locationDetails.areas.length)
          
          const areaUrl = locationDetails.areas[randomAreaIndex].url
          return fetch(areaUrl)
        } else {

          alert('Oh no, it seems like there is no areas this way. Please select another location..') // alert message if no areas
        }
      })
      .then(response => response.json())
      .then(areaDetails => {
        if (areaDetails.pokemon_encounters.length === 0) {  // If length is 0, no encounters available in the object
          setEncounter({
            message: "Oh noo! This location doesn't seem to have any Pokémon."
          })
        } else {
          // To randomize a number again cause it can be more than 1 encounter as well ===> Journey Hints
          const randomEncounterIndex = Math.floor(Math.random() * areaDetails.pokemon_encounters.length)
          const pokemonUrl = areaDetails.pokemon_encounters[randomEncounterIndex].pokemon.url
          return fetch(pokemonUrl)
        }
      })
      .then(response => response.json())
      .then(pokemonDetails => {
        // Now here we can set the encountered Pokémon details
        setEncounter({
          name: pokemonDetails.name,
          sprite: pokemonDetails.sprites.front_default   // sprite = picture of pokemon
        })
      })
      .catch(error => {
        console.error('Error in the handleLocationClick:', error)
      })
  }

  const handleBack = () => setEncounter(null) 

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

        <div>
          <div className='pokemonLogo'>
            <img src='pngegg.png' className='logo'></img>
          </div>

          {!encounter && (
            <>
              <h1>Locations</h1>
              <p className='locationSelect'>Select a location and start the game!</p>
            </>
          )}

          {!encounter && (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#161614' }}>
              {locations.map((location) => (
              <LocationItem 
                key={location.name}
                locationName={location.name}
                handleLocationClick={() => handleLocationClick(location.url)}
              />
            ))}
          </Box>
          )}


          {encounter && !encounter.message && (
            <div>
              
              <PokemonEncounter
                name={encounter.name}
                sprite={encounter.sprite}
                usersPokemons={usersPokemons}
                setIsUserWon={setIsUserWon}
                handleBack={handleBack}
              />

            </div>       
          )}


          {encounter && encounter.message && (
            <div>
              <p>{encounter.message}</p>
              <Button type='button' onClick={() => setEncounter(null)}>Back to locations</Button>
            </div>
          )}
        </div>

    </ThemeProvider>
  )
}

export default App
