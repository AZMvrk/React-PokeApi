import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import PokemonData from "./PokemonData"
import UserPokemonItem from "./UserPokemonItem"
import { Button } from '@mui/material'

const PokemonEncounter = ({ name, sprite, usersPokemons, setIsUserWon, handleBack }) => {

  const [pokemonData, setPokemonData] = useState(null)
  const [userPokemon, setUserPokemon] = useState(null)

  const [userPokemonHP, setUserPokemonHP] = useState(0)
  const [encounteredPokemonHP, setEncounteredPokemonHP] = useState(0)

  const [isUserTurn, setIsUserTurn] = useState(true)

  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)     // Encountered Pokémon Data
    .then(res => res.json())
    .then(data => {
      setPokemonData(data)
      setEncounteredPokemonHP(data.stats[0]["base_stat"])   // This is HP. Maybe we should sum with the def
    })
  }, [name])
  

  const handleAttack = (pokemonData, userPokemon) => {
    
    let randomZ = Math.floor(Math.random() * (255 - 217 + 1)) + 217

    function formula(attack, defense) {
      return Math.floor(((((2/5+2)*attack*60/defense)/50)+2)*randomZ/255)
    }
    
    if (isUserTurn) {
      let attackOfOurPokemon = userPokemon.stats[1].base_stat   // This should be OUR pokemon atk
      let defenseOfEnemyPokemon = pokemonData.stats[2].base_stat

      setEncounteredPokemonHP(prevHP => Math.max(prevHP - formula(attackOfOurPokemon, defenseOfEnemyPokemon), 0))
    } else {
      let attackOfEnemyPokemon = pokemonData.stats[1].base_stat   // This should be ENEMY pokemon atk
      let defenseOfOurPokemon = userPokemon.stats[2].base_stat

      setUserPokemonHP(prevHP => Math.max(prevHP - formula(attackOfEnemyPokemon, defenseOfOurPokemon), 0))
    }
  
    setIsUserTurn(!isUserTurn); // Switch turns
  }

  const handleSelectedPokemon = (selectedPokemon) => {
    //console.log("You choose this pokemon: ", selectedPokemon)
    setUserPokemon(selectedPokemon)
    setUserPokemonHP(selectedPokemon.stats[0].base_stat)
  }
  
  const wonOrLost = (string) => {
    if(string === "won"){

      setIsUserWon(true)
      return <p className="won">Yay! <br></br> You won the battle.</p>
    } else {

      setIsUserWon(false)
      return <p className="lost">Ouch! <br></br> You lost the battle.</p>
    }
  }



  return (
    <div className="pokemon-encounter">

      <div className="enemyPokemon">
        <img src={sprite} alt={`We must write an alt so imagine ${name} here`} className="enemyPicture" />
      </div>
      
      <div className="pokedexAndAttack">

        {pokemonData && (
          <PokemonData 
          pokemonData={pokemonData}
          sprite={sprite}
          />
          )}
        
        
        <div className="attack">
          { pokemonData && userPokemon &&
          <>
            <div>
              <img src={pokemonData.sprites.front_default} alt={`We must write an alt so imagine ${pokemonData.name} here`} />
              <p className="enemyHp">{pokemonData.name} HP : {encounteredPokemonHP}</p>
            </div>
           
            <div className="fightAndAttack">
              { encounteredPokemonHP <= 0 ? (
                wonOrLost('won')
                ) : userPokemonHP <= 0 ? (
                  wonOrLost('lost')
                  ) : (
                    <p className="fight">FIGHT!</p>
                    )
                  }
              <button onClick={() => handleAttack(pokemonData, userPokemon)} id="attackButton">Attack</button>
            </div>

            <div>
              <img src={userPokemon.sprites.front_default} alt={`We must write an alt so imagine ${pokemonData.name} here`} />
              <p className="userHp">{userPokemon.name} HP : {userPokemonHP}</p>
            </div>
          </>
          }
        </div>

      </div>
      
      <Button onClick={handleBack} variant="outlined" size="small" id='backButton'>Back</Button>

      <div className="allUsersPokemon">
        <h3 className="usersPokemonH3">Pokémons of Techachu team:</h3>

        <div className="users-pokemons">
          {usersPokemons.map(pokemon => (
        
          <UserPokemonItem 
            pokemon={pokemon}
            handleSelectedPokemon={handleSelectedPokemon}
            key={pokemon.name}
          />
            
          ))}
        </div>
      </div>
    </div>
  );
};

PokemonEncounter.propTypes = {
  name: PropTypes.string.isRequired,
  sprite: PropTypes.string.isRequired,
  usersPokemons: PropTypes.array.isRequired,
  setIsUserWon: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired
}


export default PokemonEncounter;
