import styles from './style.module.css';
import { useState, useEffect } from 'react';
import weatherConfig from '../../config/weatherApi.json';
import cities from '../../cities/cities.json';
import WeatherCard from './WeatherCard';

const Main = () => {
	const [cityName, setCityName] = useState('');
	const [weatherInfo, setWeatherInfo] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [seacrhSortedList, setSearchSortedList] = useState(null);

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
				<WeatherCard 
				styles={styles} 
				weatherInfo={weatherInfo}
				cityName={cityName}
				/>
			}
		</main>
	)
}
export default Main;