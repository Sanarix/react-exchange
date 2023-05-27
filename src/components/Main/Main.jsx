import styles from './style.module.css';
import { useState, useEffect } from 'react';
import weatherConfig from '../../config/weatherApi.json';
import cities from '../../cities/cities.json';
import WeatherCard from './WeatherCard';
import Overlay from '../Overlay/Overlay';

const Main = () => {
	const [cityName, setCityName] = useState('');
	const [weatherInfo, setWeatherInfo] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [seacrhSortedList, setSearchSortedList] = useState(null);
	const [overlayShow, setOverlayShow] = useState(false);

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
			clear()
	}

		function searchHandler(value) {
			if(value.length) {
				setSearchSortedList(cities.filter(el => el.name.toLowerCase().slice(0, value.length).includes(value.toLowerCase())));
			}else {
				setSearchSortedList(null)
			}
		}

		function clear() {
			setSearchQuery('');
			setSearchSortedList(null);
			setOverlayShow(false);
		}

		useEffect(() => {
			searchHandler(searchQuery)
		}, [searchQuery])

	return (
		<>
		{overlayShow && 
			<Overlay style={styles.overlay} handler={clear}/>
		}
		<main className={styles.main}>
			<div className={styles.searchWrapper}>
				<input 
					className={styles.searchInput} 
					onClick={() => {setOverlayShow(true)}}
					onChange={(e) => {setSearchQuery(e.target.value)}} 
					value={searchQuery} 
					placeholder='Поиск города'>
				</input>
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

				{weatherInfo && 
				<WeatherCard 
				styles={styles} 
				weatherInfo={weatherInfo}
				cityName={cityName}
				/>
			}
			</div>
		</main>
		</>
	)
}
export default Main;