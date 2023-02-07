import { App } from './src/app/container';
export default App;

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();