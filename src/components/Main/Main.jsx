import styles from './style.module.css';
import {useState, useEffect} from 'react';
import weatherConfig from '../../config/weatherApi.json';
import cities from '../../cities/cities.json';


const Main = () => {
	const [resData, setResData] = useState(null);
	const [cityCoords, setCityCoords] = useState(null);
	const [weatherInfo, setWeatherInfo] = useState(null);

	useEffect(() => {
		setCityCoords({lat: cities[0].lat, lon: cities[0].lon})
	}, [])

	useEffect(() => {
		console.log(cityCoords);
	}, [cityCoords])

	useEffect(() => {
		console.log(weatherInfo);
	}, [weatherInfo])

	function selectHandler(e) {
		const city = cities.filter((el) => 
			el.name === e.target.value
		)[0]
		setCityCoords({lat: city.coords.lat, lon: city.coords.lon})
	}

		function getWeather() {
			fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${weatherConfig['API-Key']}`)
			.then(res => res.json())
			.then(res => {
				setWeatherInfo(res);
			})
			.catch(err => {
				throw new Error(err.message)
			})
		}

	return (
		<main className={styles.main}>
			<select onChange={selectHandler}>
				{cities.map((el, i) => {
					return (
						<option key={i} value={el.name}>
							{el.name}
						</option>
					)
				})}
			</select>
			<button onClick={getWeather}>Сделать запрос</button>
			{/* {weatherInfo && 
						<div className={styles.weatherCard}>
						<h1 className={styles.weatherCardHeader}>{data.location.name}</h1>
						<div className={styles.weatherCardBody}>
							<ul>
								<li>Current weather: {data.current.weather_descriptions[0]}</li>
								<li>Time: {data.current.observation_time}</li>
								<li>Temperature: {data.current.temperature}</li>
								<li>Pressure: {data.current.pressure}</li>
								<li>Wind speed: {data.current.wind_speed}</li>
								<li>Wind direction: {data.current.wind_dir}</li>
								<li>{'Visibility (m)'} : {data.current.visibility}</li>
								<li>UV-index: {data.current.uv_index}</li>
								<li><img src={data.current.weather_icons} alt="weather-icon"/></li>
							</ul>
						</div>
					</div>
			} */}
		</main>
	)
}
export default Main;