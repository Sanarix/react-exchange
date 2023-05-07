import styles from './style.module.css';

const Footer = () => {

	function getCurrentDate() {
		return new Date().getFullYear()
	}

	return (
		<footer className={styles.footer}>
			<div>
				Disign and develop by <a href="https://korsakovla.web.app/">Leonid Korsakov</a>
			</div>
			<div>
				© All rights reserved 2023 - {getCurrentDate()}
			</div>
		</footer>
	)
}

export default Footer;