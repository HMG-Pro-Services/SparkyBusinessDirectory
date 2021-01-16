const readAs = (file: any, as) => {
	if (!(file instanceof Blob)) {
		throw new TypeError('Must be a File or Blob');
	}
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e) {
			resolve(e.target['result']);
		};
		reader.onerror = function (e) {
			reject('Error reading' + file['name'] + ': ' + e.target['result']);
		};
		reader['readAs' + as](file);
	});
};

export const readAsDataURL = (file) => {
	return readAs(file, 'DataURL');
};

export const readAsText = (file) => {
	return readAs(file, 'Text');
};

export const readAsArrayBuffer = (file) => {
	return readAs(file, 'ArrayBuffer');
};