import PropTypes from 'prop-types'
import { ListItem, ListItemButton } from '@mui/material'

const LocationItem = ({ locationName, handleLocationClick }) => {
  return (

      <ListItem disablePadding>
        <ListItemButton onClick={handleLocationClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {locationName}
        </ListItemButton>
      </ListItem>
   
  );
};

LocationItem.propTypes = {
  locationName: PropTypes.string.isRequired,
  handleLocationClick: PropTypes.func.isRequired
}

export default LocationItem;