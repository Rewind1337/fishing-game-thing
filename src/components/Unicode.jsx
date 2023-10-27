import PropTypes from 'prop-types';

export default function Unicode({c, iconscale = "1", color = 'white', style}) {
    return (
      <div className="unicode aspect-card-icon " style={style}>
        <div className="character" style={{filter: 'drop-shadow(0 0 4px)', scale: iconscale, color: color}}>
          {c}
        </div>
      </div>
    )
  }

Unicode.propTypes = {
c: PropTypes.string.isRequired,
iconscale: PropTypes.string,
color: PropTypes.string,
style: PropTypes.object,
};