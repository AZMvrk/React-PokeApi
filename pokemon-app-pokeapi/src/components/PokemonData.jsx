import PropTypes from 'prop-types'

function PokemonData({ pokemonData, sprite }) {

  //console.log("Pokédex pokemon data: ", pokemonData)


  return (
    <div className='pokedex'>
      <div className="pokedexInfos">
        <h2>Pokédex</h2>

        <img src={sprite} alt={`We must write an alt so imagine ${pokemonData.name} here`} />

        <h3>{pokemonData.name.toUpperCase()}</h3>

        <p>Basic info : {pokemonData.name} is a {pokemonData.types.map(type => type.type.name).join(' and ')} type Pokémon</p>     

        <p>that famous about its {pokemonData.abilities.map(ability => ability.ability.name).join(' | ')} ability..</p>

        <p>Average height/weight : {pokemonData.height} inch / {pokemonData.weight} pounds</p>
      
        <p className="statsTitle">STAT POINTS :</p>
        <ul className="statPoints">
          <li>HP : {pokemonData.stats[0]["base_stat"]}</li>
          <li>ATK : {pokemonData.stats[1]["base_stat"]}</li>
          <li>DEF : {pokemonData.stats[2]["base_stat"]}</li>
          <li>SPD : {pokemonData.stats[5]["base_stat"]}</li>
        </ul>
      </div>
    </div>
  )
}

PokemonData.propTypes = {
  pokemonData: PropTypes.object.isRequired,
  sprite: PropTypes.string.isRequired
}

export default PokemonData