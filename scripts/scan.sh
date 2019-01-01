sonar-scanner \
	-Dsonar.projectKey=ounceofsilver_isitshabbat \
	-Dsonar.organization=ounceofsilver \
	-Dsonar.sources=./src \
	-Dsonar.host.url=https://sonarcloud.io \
	-Dsonar.login=$SONARCLOUD_ISITSHABBATAPP \
	-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
	-Dsonar.coverage.exclusions=**/*.spec.js
