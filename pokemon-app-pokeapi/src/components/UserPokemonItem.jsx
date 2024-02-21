import PropTypes from 'prop-types'
import { Button } from "@mui/material"

const UserPokemonItem = ({ pokemon, handleSelectedPokemon}) => {
  return (
    <div className="user-pokemon-item">

      <img src={pokemon.sprites.front_default} className="userPokemonPicture"/>

      <div className="usersPokemonsInfos">
        <p>HP: {pokemon.stats[0]["base_stat"]}</p>
        <p>ATK: {pokemon.stats[1]["base_stat"]}</p>
        <p>DEF: {pokemon.stats[2]["base_stat"]}</p>
        <p>SPD: {pokemon.stats[5]["base_stat"]}</p>
      </div>

      <Button variant="contained" id="chooseButton" onClick={() => handleSelectedPokemon(pokemon)}> {pokemon.name.toUpperCase()}! I choose you ! </Button> 

    </div>
  );
};

UserPokemonItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
  handleSelectedPokemon: PropTypes.func.isRequired
}

export default UserPokemonItem;