import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './WeatherClock.css'

WeatherClock.propTypes = {
  headerText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  children: PropTypes.array,
};
  
function WeatherClock() {
  const [currentTimestamp, setCurrentTimestamp] = useState('')
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('')

  const tick = () => {
    let millis = Date.now();
    millis *= 6;
    setCurrentTimestamp(millis);
    let date = new Date(millis);
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    setCurrentTimeFormatted(h + ':' + m + ':' + s)
  }

  useEffect(() => {
    const timer = setInterval(tick, 100);

    return () => {
      clearInterval(timer);
    };

  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {currentTimeFormatted} : {currentTimestamp}
    </div>
  );
}

export default WeatherClock