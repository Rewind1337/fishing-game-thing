import GLOBALS from '../../globals/Globals';
import SaveContext from '../../context/SaveContext.jsx';
import { useState, useEffect, useRef, useContext } from 'react';
import { getWeatherFromNoise, setupWeatherNoise } from './WeatherNoise.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './WeatherClock.scss'
  
function WeatherClock() {
  const _context = useContext(SaveContext);

  const [currentTimestamp, setCurrentTimestamp] = useState(0)

  let date = new Date(Date.now() * GLOBALS.COMPONENTS.CLOCK.SPEED);
  let currentHour = (Math.floor(date.getHours()) + 22) % 24;
  let h = "" + currentHour;
  let m = "" + date.getMinutes();
  let s = "" + date.getSeconds();

  const currentTimeFormatted = useRef(h.padStart(2, '0') + ':' + m.padStart(2, '0') + ':' + s.padStart(2, '0'))

  const currentWeather = useRef(0)
  
  const currentTimeOfDay = useRef(0)

  let weatherNoise = setupWeatherNoise(0, 12)

  const setRefs = _context.setRefs;

  const tick = () => {
    let millis = (Date.now());
    millis *= GLOBALS.COMPONENTS.CLOCK.SPEED;
    setCurrentTimestamp(millis);
    
    let output = getWeatherFromNoise(weatherNoise, millis / GLOBALS.COMPONENTS.CLOCK.SPEED)
    let weather = output.weather;
    currentWeather.current = weather;
    weatherNoise = output.updatedAmplitudes;

    

    let date = new Date(millis);
    let currentHour = (Math.floor(date.getHours()) + 22) % 24;
    let h = "" + currentHour;
    let m = "" + date.getMinutes();
    let s = "" + date.getSeconds();
    currentTimeFormatted.current = h.padStart(2, '0') + ':' + m.padStart(2, '0') + ':' + s.padStart(2, '0')
    
    setRefs({weatherclock: {
      weather: currentWeather.current,
      time: currentTimeOfDay.current,
    }});
  }

  useEffect(() => {
    const timer = setInterval(tick, 100);

    return () => {
      clearInterval(timer);
    };

  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timeOfDay = ((currentTimestamp)/1000/60/6)%60 / 60;
    currentTimeOfDay.current = timeOfDay
  }, [currentTimestamp])
  
  const iconClasses = 'weather-bar-icon'
  const activeColor = (color) => {return {
    color: color,
    height: '20px', 
  }}

  const onLoadColor = {backgroundColor: 'rgb(128, 128, 128)'}
  const animatedColor = {backgroundColor: 'hsl(' + ((currentTimestamp)/1000/60)%360 + 'deg, 50%, 50%)'}

  return (
    <div id="weather-clock" style={{borderRadius: "4px"}}>
      <div id="weather-clock-bg" style={(currentTimestamp ? animatedColor : onLoadColor)}></div>
      <div id="weather-clock-data">
      <div className="weather-clock-current-time">
        {currentTimeFormatted.current}
      </div>
      <div className="weather-clock-current-weather" style={{fontSize: "12px"}}>
        W:{currentWeather.current.toFixed(5)} &nbsp; &nbsp; &nbsp; TOD:{currentTimeOfDay.current.toFixed(5)}
      </div>
      <div className="weather-bar">
        
        <FontAwesomeIcon style={(currentWeather.current > 0       && currentWeather.current < 0.14285 ? activeColor("hsl(89deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-cloud-bolt"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.14285 && currentWeather.current < 0.28571 ? activeColor("hsl(149deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-cloud-sun-rain"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.28571 && currentWeather.current < 0.42857 ? activeColor("hsl(60deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-sun"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.42857 && currentWeather.current < 0.57142 ? activeColor("hsl(30deg, 100%, 92%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-cloud-sun"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.57142 && currentWeather.current < 0.71428 ? activeColor("hsl(0deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-cloud"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.71428 && currentWeather.current < 0.85714 ? activeColor("hsl(280deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-cloud-rain"} />
        <FontAwesomeIcon style={(currentWeather.current > 0.85714 && currentWeather.current < 1       ? activeColor("hsl(180deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={"fa-solid fa-snowflake"} />

      </div>
      </div>
    </div>
  );
}

export default WeatherClock