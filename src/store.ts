import createStore from 'is-it-shabbat-core/dist/store';

export default createStore(
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
