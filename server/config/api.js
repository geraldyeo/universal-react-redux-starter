import session from 'express-session';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';

import * as actions from '../routes';
import { mapUrl } from '../utils/mapUrl';

const pretty = new PrettyError();

export default function configureAPI (app) {
	app.use(session({
		secret: 'react and redux rule!!!!',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 }
	}));
	app.use(bodyParser.json());

	app.use((req, res) => {
		const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

		const { action, params } = mapUrl(actions, splittedUrlPath);

		if (action) {
			action(req, params)
				.then((result) => {
					if (result instanceof Function) {
						result(res);
					} else {
						res.json(result);
					}
				}, (reason) => {
					if (reason && reason.redirect) {
						res.redirect(reason.redirect);
					} else {
						console.error('API ERROR:', pretty.render(reason));
						res.status(reason.status || 500).json(reason);
					}
				});
		} else {
			res.status(404).end('NOT FOUND');
		}
	});
}
