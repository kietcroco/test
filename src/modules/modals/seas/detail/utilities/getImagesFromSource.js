import axios from 'axios';
export default (source, title) => {

	const {
		avatar,
		images
	} = source;

	const imagesArr = [];

	if (avatar && Array.isArray(avatar) && avatar[1]) {
		imagesArr.push({
			caption: title || null,
			source: avatar[1]
		});
	}

	if (images && Array.isArray(images)) {

		images.forEach(image => {
			image && Array.isArray(image) && image[1] && imagesArr.push({
				caption: title || null,
				source: image[1]
			});
		});
	}

	return imagesArr;
};