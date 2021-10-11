export const unifyArray = (arr) => {
	const obj = {};
	const newArr = arr.filter((entry) => {
		if (obj[entry.public_id]) {
			return false;
		}
		obj[entry.public_id] = true;
		return true;
	});

	return newArr;
};
