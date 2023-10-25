import { useState, useEffect, useRef } from 'react';
import { getWeatherFromNoise, setupWeatherNoise } from './WeatherNoise.js'
import './WeatherClock.scss'
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faCloudSunRain, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons';
  
function WeatherClock() {
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
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000 / 15);

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
        
        <FontAwesomeIcon style={(currentWeather.current > 0       && currentWeather.current < 0.14285 ? activeColor("hsl(89deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faCloudBolt} />
        <FontAwesomeIcon style={(currentWeather.current > 0.14285 && currentWeather.current < 0.28571 ? activeColor("hsl(149deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faCloudSunRain} />
        <FontAwesomeIcon style={(currentWeather.current > 0.28571 && currentWeather.current < 0.42857 ? activeColor("hsl(60deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faSun} />
        <FontAwesomeIcon style={(currentWeather.current > 0.42857 && currentWeather.current < 0.57142 ? activeColor("hsl(30deg, 100%, 92%)") : activeColor("white"))} className={(iconClasses)} icon={faCloudSun} />
        <FontAwesomeIcon style={(currentWeather.current > 0.57142 && currentWeather.current < 0.71428 ? activeColor("hsl(0deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faCloud} />
        <FontAwesomeIcon style={(currentWeather.current > 0.71428 && currentWeather.current < 0.85714 ? activeColor("hsl(280deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faCloudRain} />
        <FontAwesomeIcon style={(currentWeather.current > 0.85714 && currentWeather.current < 1       ? activeColor("hsl(180deg, 100%, 85%)") : activeColor("white"))} className={(iconClasses)} icon={faSnowflake} />

      </div>
      </div>
    </div>
  );
}

export default WeatherClock