import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './WeatherClock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faCloudSunRain, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons';

WeatherClock.propTypes = {
  headerText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  children: PropTypes.array,
};

// Tested, kinda works????

// desc:
//   generates an amplitude set for the current 'day' to generate the weather with
// in:
//   time (milliseconds, from Date.now())
//   granularity (1, 2, 3, etc.), number of bifurcations and thus the number of waves that contribute to the weather
// out:
//   amplitudes struct {A, refreshTime (ms)}
function setupWeatherNoise(time, granularity) {
  
	// milliseconds to days except we have 6 days per irl day
	let dayLength = 3600 * 1000 * 24 / 6;
	let day = Math.floor(time / dayLength);
	let dayTime = (time % dayLength) / dayLength;
	
	// List of lists which contains the points that each wave will go through (so not really amplitudes, but whatever)
	let amplitudes = [];
	for (let i = 1; i <= granularity; i++) {
		let steps = 2**i;
		
		let localAmps = [];
		for (let j = 0; j <= steps; j++) {
			let timePoint = day + (j / steps);
			let semiRandomValue = (1 + (timePoint * 0.2834564 + steps * timePoint * 0.3259623 + steps * steps * timePoint * 0.403452) % 1) % 1;
			localAmps.push((semiRandomValue * 2 - 1) / (steps * 2));
		}
		amplitudes.push(localAmps);
	}

	return {A: amplitudes, refreshTime: time + Math.floor((1 - dayTime) * dayLength)};
}

// desc:
//   generates a(n) (unbiased) weather value between 0 and 1 from an amplitude set and the current time, perlin noise?
// in:
//   amplitudes struct {A, refreshTime}
//   time (milliseconds, from Date.now())
// out:
//   weatherUpdate struct {weather, updatedAmplitudes}
function getWeatherFromNoise(amplitudes, time) {
	
	// Will update itself automatically if it is a new day
	// weatherAmps is always returned back to you in the output struct
	let weatherAmps = amplitudes;
	let granularity = weatherAmps.A.length;
	if (time > amplitudes.refreshTime) {
		weatherAmps = setupWeatherNoise(time, granularity);
	}
	
	// milliseconds to days except we have 6 days per irl day
	let dayLength = 3600 * 1000 * 24 / 6;
	let dayTime = (time % dayLength) / dayLength;
	
	// Sum progressively higher frequency and lower amplitude waves together (should never overshoot, but might not hit the highs and lows)
	// I wanna make a biased version which you can shift towards a certain value or higher or lower values (or narrow, etc.)) 
	let weather = 0.5;
	
	for (let i = 0; i < granularity; i++) {
		let steps = weatherAmps.A[i].length - 1;
		let j = Math.floor(dayTime * steps);
		
		let pointA = weatherAmps.A[i][j];
		let pointB = weatherAmps.A[i][j+1];
		
		let phase = (dayTime * steps) % 1;
		
		let rest = (pointB + pointA) / 2;
		let amp = (pointB - pointA) / 2;
		
		weather += rest + amp * Math.cos(phase * Math.PI);
	}

	return {'weather': weather, 'updatedAmplitudes': weatherAmps};
}
  
function WeatherClock() {
  const [currentTimestamp, setCurrentTimestamp] = useState(0)

  let millis = Date.now();
  millis *= 600;
  let date = new Date(millis);

  let h = "" + date.getHours();
  let m = "" + date.getMinutes();
  let s = "" + date.getSeconds();

  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(h.padStart(2, '0') + ':' + m.padStart(2, '0') + ':' + s.padStart(2, '0'))

  const currentWeather = useRef(0)
  
  const currentTimeOfDay = useRef(0)

  let weatherNoise = setupWeatherNoise(0, 12)

  const tick = () => {
    let millis = (Date.now());
    millis *= 6;
    setCurrentTimestamp(millis);
    
    let output = getWeatherFromNoise(weatherNoise, millis/6)
    let weather = output.weather;
    currentWeather.current = weather;
    weatherNoise = output.updatedAmplitudes;

    let date = new Date(millis);

    let h = "" + date.getHours();
    let m = "" + date.getMinutes();
    let s = "" + date.getSeconds();
    setCurrentTimeFormatted(h.padStart(2, '0') + ':' + m.padStart(2, '0') + ':' + s.padStart(2, '0'))
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
  const onLoadColor = {backgroundColor: 'rgb(128, 128, 128)'}
  const animatedColor = {backgroundColor: 'hsl(' + ((currentTimestamp)/1000/60)%360 + 'deg, 50%, 50%)'}

  return (
    <div id="weather-clock" style={{borderRadius: "4px"}}>
      <div id="weather-clock-bg" style={(currentTimestamp ? animatedColor : onLoadColor)}></div>
      <div className="weather-clock-current-time">
        {currentTimeFormatted}
      </div>
      <div className="weather-clock-current-weather" style={{fontSize: "12px"}}>
        W:{currentWeather.current.toFixed(5)} &nbsp; &nbsp; &nbsp; TOD:{currentTimeOfDay.current.toFixed(5)}
      </div>
      <div className="weather-bar">
        <div id="weather-bar-dongle" style={{position: 'fixed', left: (currentWeather.current * 300) + "px", top: "84px", backgroundColor: 'hsl(' + Math.abs(200 - (currentWeather * 400)) + 'deg, 100%, 50%)', width: "3.5px", height: "15px"}}></div>
        
        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '-45px'}} className={iconClasses} icon={faCloudBolt} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "9px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>
        
        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '-30px'}} className={iconClasses} icon={faCloudSunRain} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "53px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '-15px'}} className={iconClasses} icon={faSun} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "94px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px'}} className={iconClasses} icon={faCloudSun} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "52%", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '15px'}} className={iconClasses} icon={faCloud} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "181px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '30px'}} className={iconClasses} icon={faCloudRain} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "221px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

        <FontAwesomeIcon style={{height: '20px', position: 'relative', top: '5px', left: '45px'}} className={iconClasses} icon={faSnowflake} />
        <div className="weather-bar-dongle" style={{position: 'fixed', left: "260px", top: "74px", backgroundColor: "white", width: "1px", height: "25px"}}></div>

      </div>
    </div>
  );
}

export default WeatherClock