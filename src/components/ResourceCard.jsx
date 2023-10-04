import PropTypes from 'prop-types';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string,
  value: PropTypes.number,
  cap: PropTypes.number,
  perSec: PropTypes.number,
};
  
function ResourceCard({icon, name, value, cap, perSec}) {
  return (
  <div className="resource-card">
    <div className="resource-card-icon">{icon}</div>
    <div className="resource-card-name">{name}</div>
    <div className="resource-card-value">{value}{(cap ? ' / ' + cap : '')}</div>
    {
      (perSec ? <div className="resource-card-persec">{"+ " + perSec + "/s"}</div> : <></>) 
    }
  </div>
  );
}

export default ResourceCard