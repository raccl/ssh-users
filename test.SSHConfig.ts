import { SSHConfig } from './src/ssh/config/';

let config: any = {};
config = new SSHConfig();
config.host = 'raccl';
config.users.addUser({
	prefix: 'raccl',
	user: 'ubuntu'
});
config.users.addUser({
	prefix: 'raccl',
	user: 'corcc'
});
config.users.addUser({
	prefix: 'raccl',
	user: 'raccl'
});
module.exports = config;
