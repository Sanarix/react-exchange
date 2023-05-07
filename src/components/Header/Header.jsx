import styles from './style.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				SIMPLE WEATHER
			</div>
			<nav>
				{/* TODO добавить ссылку на гитхаб */}
				<a href="https://github.com/Sanarix/react-exchange">Look at this project on GitHub!</a>
			</nav>
		</header>
	)
}

export default Header;