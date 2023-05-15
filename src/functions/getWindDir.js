const getWindDir = (deg) => {
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

export default getWindDir;