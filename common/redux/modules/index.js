import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';

import activity from './activity';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
	activity,
	routing
});

export default rootReducer;