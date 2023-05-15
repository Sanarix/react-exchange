import styles from './style.module.css';
import { useState, useEffect } from 'react';
import weatherConfig from '../../config/weatherApi.json';
import cities from '../../cities/cities.json';


const Main = () => {
	const [cityName, setCityName] = useState('');
	const [weatherInfo, setWeatherInfo] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [seacrhSortedList, setSearchSortedList] = useState(null);
	const CelciumCoefficient = 273.15;
	const PressureCoefficient = 0.75;

	function handler(e) {
		const city = seacrhSortedList.filter((el) => 
			el.name === e.target.textContent
		)[0];
		setCityName(city.name)
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${weatherConfig['API-Key']}&lang=ru`)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				setWeatherInfo(res);
			})
			.catch(err => {
				throw new Error(err.message)
			})
			setSearchQuery('');
			setSearchSortedList(null);
	}

		function getWindDir(deg) {
			switch(true) {
				case deg === 0 || deg === 360: return 'С';
				case deg > 0 && deg < 90: return 'СВ'
				case deg === 90: return 'В';
				case deg > 90 && deg < 180: return 'ЮВ'
				case deg === 180: return 'Ю';
				case deg > 180 && deg < 270: return 'ЮЗ'
				case deg === 270: return 'З';
				case deg > 270 && deg < 360: return 'СЗ'
				default: return 'Not wind'
			}
		}

		function searchHandler(value) {
			if(value.length) {
				setSearchSortedList(cities.filter(el => el.name.toLowerCase().slice(0, value.length).includes(value.toLowerCase())));
			}else {
				setSearchSortedList(null)
			}
		}

		useEffect(() => {
			searchHandler(searchQuery)
		}, [searchQuery])

	return (
		<main className={styles.main}>
			<div className={styles.searchWrapper}>
				<input className={styles.searchInput} onChange={(e) => {setSearchQuery(e.target.value)}} value={searchQuery} placeholder='Поиск города'></input>
				<ul id="cities-list"className={styles.citiesList}>
					{seacrhSortedList && 
					seacrhSortedList.map((el, i) => {
						return (
							<li key={i} onClick={handler}>
								{el.name}
							</li>
						)
					})
					}
					{
						searchQuery &&
						seacrhSortedList?.length === 0 &&
						<li>Совпадений не найдено</li>
					}
				</ul>
			</div>
			{weatherInfo && 
				<div className={styles.weatherCard}>
					<h1 className={styles.weatherCard_header}>{cityName}</h1>
					<h2 className={styles.weatherCard_subheader}> Сейчас {weatherInfo.weather[0].description}
					</h2>
					<img className={styles.weatherCard_image} src={` https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="weather-icon" />
					<ul className={styles.weatherCard_list}>
						<li>Температура: {
						Math.floor(weatherInfo.main.temp - CelciumCoefficient)
						}{'\u00b0'}C
						</li>
						<li>Ощущается как: {
						Math.floor(weatherInfo.main.feels_like - CelciumCoefficient)
						}{'\u00b0'}C
						</li>
						<li>Влажность: {weatherInfo.main.humidity} %</li>
						<li>Давление: {(weatherInfo.main.pressure * PressureCoefficient).toFixed()} мм.рт.ст.</li>
						<li>Ветер: {Math.floor(weatherInfo.wind.speed)} м/с</li>
						<li>Порывы ветра до: {Math.floor(weatherInfo.wind.gust) || 0}  м/с</li>
						<li>Направление ветра: {getWindDir(weatherInfo.wind.deg)}</li>
						<li>Процент облачности: {weatherInfo.clouds.all} %</li>
					</ul>
				</div>
			}
		</main>
	)
}
export default Main;