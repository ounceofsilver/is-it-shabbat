// TODO(james.fulford): can't import Expo during tests,
// so these tests are not running
const Image = {
	prefetch: sinon.stub(),
};
const Asset = {
	fromModule: sinon.stub(),
};
const Font = {
	loadAsync: sinon.stub(),
};

const Location = {
	getCurrentPositionAsync: sinon.stub(),
};
const Permissions = {
	askAsync: sinon.stub(),
};

const initialize = sinon.stub();
const luxonLocal = sinon.stub();

const initialization = proxyquire('../src/initialization', {
	'react-native': {
		Image,
		Asset,
	},
	expo: {
		Location,
		Permissions,
		Font,
	},
	'is-it-shabbat-core': {
		action: {
			initialize,
		},
		utilities: {
			DateTime: {
				local: luxonLocal,
			},
		},
	},
}).default;

const DEFAULT_COORDS = {
	latitude: 31.776875,
	longitude: 35.233673,
};

const COORDS = {
	latitude: 42,
	longitude: 73,
};
const DATE = local(2018, 12, 25);

describe('initialization', () => {
	it('should use default location', () => {
		Permissions.askAsync.resolves({ status: 'NOPE' });
		luxonLocal.returns(DATE);
		initialization();
		expect(initialize).to.have.been.calledOnce();
		expect(initialize.args[0][0]).to.deep.equal(DATE);
		expect(initialize.args[0][1]).to.deep.include({
			coords: DEFAULT_COORDS,
		});
	});

	it('should request location', () => {
		Permissions.askAsync.resolves({ status: 'granted' });
		luxonLocal.returns(DATE);
		Location.getCurrentPositionAsync.resolves({ coords: COORDS });
		initialization();
		expect(initialize).to.have.been.calledOnce();
		expect(initialize.args[0][0]).to.deep.equal(DATE);
		expect(initialize.args[0][1]).to.deep.include({
			coords: COORDS,
		});
	});
});
