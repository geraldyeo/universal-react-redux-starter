export default function getUsers () {
	return new Promise((resolve) => {
		resolve({
			message: 'This came from the api server',
			time: Date.now()
		});
	});
};
