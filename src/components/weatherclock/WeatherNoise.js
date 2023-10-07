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

export {getWeatherFromNoise, setupWeatherNoise};