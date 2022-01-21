import { NodeSSH } from 'node-ssh';
import { addGroups, addUserToGroups } from '../group';
import { setUserPublicKey } from '../key/PublicKey';
import { getSSHUserConfig } from '../ssh/config';
import { runCommand } from '../ssh/exec/command';
import { User } from './Type';

export async function addUser (ssh: NodeSSH, {
	user,
	groups
}: User, path?: string) {
	console.log('================================');
	const _u = getSSHUserConfig(user);
	const _g = (groups ?? _u.groups ?? []);
	_g.push(user);
	const groupadd: any = await addGroups(ssh, _g);
	console.log('================================');
	const useradd: any = await runCommand(ssh, {
		command: `sudo useradd -mg ${user} ${user} || true`
	});
	console.log('================================');
	const usermod: any = await addUserToGroups(ssh, {
		user,
		groups: _g
	});
	console.log('================================');
	const pubKey = await setUserPublicKey(ssh, {
		user
	});
	console.log('================================');
	return {
		useradd,
		groupadd,
		usermod,
		pubKey
	};
}
