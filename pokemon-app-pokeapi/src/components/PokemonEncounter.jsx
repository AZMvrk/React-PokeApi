import PropTypes from 'prop-types';

const PokemonEncounter = ({ name, sprite }) => {
  return (
    <div className="pokemon-encounter">
      <h2>Encountered Pokémon</h2>
      <img src={sprite} alt={`We must write an alt so imagine ${name} here`} />
      <p>{name}</p>
    </div>
  );
};

PokemonEncounter.propTypes = {
  name: PropTypes.string.isRequired,
  sprite: PropTypes.string.isRequired,
};

export default PokemonEncounter;