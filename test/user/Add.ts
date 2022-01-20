import { NodeSSH } from 'node-ssh';
import { exit } from 'process';
import { setup } from '../../src/setup/Setup';
import { connectSSHWith } from '../../src/ssh/Connect';
import { addUser } from '../../src/user';

const newUsers = [
	'corcc',
	'raccl'
];

(async function () {
	const ssh: NodeSSH = await connectSSHWith({
		user: 'ubuntu'
	});
	console.log('============== FINISHED ==============');
	for (let i = 0; i < newUsers.length; i++) {
		console.log(`============== ${newUsers[i]} ==============`);
		const user = newUsers[i];
		console.log(user);
		const res = await addUser(ssh, {
			user
		});
		console.log(res);
	}
	await setup(ssh);
	for (let i = 0; i < newUsers.length; i++) {
		const user = newUsers[i];
		console.log(user);
		console.log(`============== ${user} ==============`);
		const res = await setup(ssh, user);
		console.log(res);
	}
	console.log('============== FINISHED ==============');
	exit(0);
})();
