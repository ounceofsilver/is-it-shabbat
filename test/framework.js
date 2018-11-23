global.expect = require('chai').expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
require('chai').use(require('sinon-chai'));

global.DateTime = require('luxon').DateTime;

global.local = (y, m, d, h = 0, min = 0, s = 0, ms = 0) => DateTime.fromObject({
	zone: 'America/New_York',
	year: y,
	month: m,
	day: d,
	hour: h,
	minute: min,
	second: s,
	millisecond: ms
});
