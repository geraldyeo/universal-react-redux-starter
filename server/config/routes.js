export default function configureRoutes (app) {
	// Proxy to API server
	app.use('/api', (req, res) => {
		proxy.web(req, res);
	});

	// app.use('/users', );
};
