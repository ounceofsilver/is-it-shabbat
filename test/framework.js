//
// Imports
//
// JSDOM utils (needed for enzyme)
import { JSDOM } from 'jsdom';
// Node utils
import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
// React utils
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Custom utils
import { DateTime } from 'luxon';

//
// JSDOM util configuration and export
//
const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};

//
// Node util configuration and export
//
chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());
chai.use(require('dirty-chai'));

global.__DEV__ = true; // eslint-disable-line
global.expect = expect;
global.sinon = sinon;
global.proxyquire = proxyquire;

//
// React util configuration and export
//
Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;

//
// Custom util configuration and export
//
global.DateTime = DateTime;
global.local = (y, m, d, h = 0, min = 0, s = 0, ms = 0) => DateTime.fromObject({
	zone: 'America/New_York',
	year: y,
	month: m,
	day: d,
	hour: h,
	minute: min,
	second: s,
	millisecond: ms,
});

//
// Ignoring some errors
//
// eslint-disable-next-line
const originalConsoleError = console.error;
// eslint-disable-next-line
console.error = (message) => {
	if (message.startsWith('Warning:')) {
		return;
	}

	originalConsoleError(message);
};
