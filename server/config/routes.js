module.exports = function configureRoutes (app) {
	app.use('/users', require('../routes/users'));
	app.use('/', require('../routes'));
}
