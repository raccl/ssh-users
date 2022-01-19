import { NodeSSH } from 'node-ssh';
import { loadSSHConfig } from './ssh/config/SSH';
import { connectSSH } from './ssh/Connect';
import { addUser } from './user/User';
(async function () {
	const {
		host,
		username,
		user,
		groups,
		privateKey,
		publicKey
	} = loadSSHConfig();
	const ssh: NodeSSH = await connectSSH({
		host,
		username,
		privateKey
	});
	addUser(ssh, {
		user: user ?? '',
		publicKey,
		groups: groups ?? ['']
	});
})();
