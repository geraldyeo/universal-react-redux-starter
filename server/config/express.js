import path from 'path';
import Express from 'express';

export default function configureExpress (app) {
	// X-Powered-By header has no functional value.
	// Keeping it makes it easier for an attacker to build the site's profile
	// It can be removed safely
	app.disable('x-powered-by');

	app.use(Express.static(path.join(__dirname, '../..', 'public')));

	app.use((req, res) => {
		if (__DEVELOPMENT__) {
			webpackIsomorphicTools.refresh();
		}

		function hydrateOnClient() {
			// res.send('<!doctype html>\n' +
			//	ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
			//	
			res.send(200, 'Yay');
		}

		if (__DISABLE_SSR__) {
			hydrateOnClient();
			return;
		}

		hydrateOnClient();
	});
};
