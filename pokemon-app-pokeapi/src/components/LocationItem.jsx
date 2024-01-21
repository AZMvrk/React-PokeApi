import PropTypes from 'prop-types';

const LocationItem = ({ locationName, handleLocationClick }) => {
  return (
    <li>
      <button onClick={handleLocationClick}>{locationName}</button>
    </li>
  );
};

// Define the prop types
LocationItem.propTypes = {
  locationName: PropTypes.string.isRequired,
  handleLocationClick: PropTypes.func.isRequired,
};

export default LocationItem;