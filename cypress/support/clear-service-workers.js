// From https://github.com/cypress-io/cypress/issues/702#issuecomment-435873135
beforeEach(() => {
	if (window.navigator && navigator.serviceWorker) {
		navigator.serviceWorker.getRegistrations()
			.then((registrations) => {
				registrations.forEach((registration) => {
					registration.unregister();
				});
			});
	}
});
