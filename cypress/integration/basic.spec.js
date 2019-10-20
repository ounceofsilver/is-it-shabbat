describe('basic test', () => {
	it('should run', () => {
		cy.server();
		cy.route('https://www.hebcal.com/hebcal/**').as('holidays');
		cy.visit('/', {
			onBeforeLoad: function(window) {
				// Stop service worker registration
				// const promise = new Promise(function () { });
				// window.navigator.serviceWorker.register = function () {
				// 	return promise;
				// }

				// Mock getCurrentPosition
				window.navigator.geolocation.getCurrentPosition = () => {
					console.log('Getting current position...');
					return { coords: { latitude: 0, longitude: 0 }};
				};
			}
		});
		cy.wait(20 * 1000);
		cy.wait('@holidays');
	});
});
