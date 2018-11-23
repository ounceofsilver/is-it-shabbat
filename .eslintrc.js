module.exports = {
	"env": {
		"node": true,
		// "browser": true,
		"es6": true,
		"mocha": true,
	},

	"parser": "babel-eslint",

	"extends": "airbnb",

	"globals": {
		"expect": true,
		"local": true,
		"DateTime": true,
		"sinon": true,
		"proxyquire": true,
	},

	"rules": {
		"indent": ["error", "tab"],
		"no-tabs": "off",

		"react/jsx-filename-extension": [
			1,
			{ "extensions": [".js", ".jsx"] }
		],
		"react/prefer-stateless-function": "off",

		"react/jsx-indent-props": 0,
		"react/jsx-indent": 0,
	}
};
