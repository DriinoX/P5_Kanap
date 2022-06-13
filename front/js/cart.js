for (var i = 0; i < localeStorage.length ; i++) {
	let key = localeStorage.key(i)
	console.log(key, localeStorage.getItem(key))
}