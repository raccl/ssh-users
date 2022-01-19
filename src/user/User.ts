import { NodeSSH } from 'node-ssh';
import { addGroups, addUserToGroups, Group } from '../group/Groups';
import { addPublicKeyToSSH, loadPublicKeyFromLocalPath } from '../key/PublicKey';
import { loadSSHConfig } from '../ssh/config/SSH';

export type User = {
	user: string;
	publicKey?: string;
	groups: Group[];
}

export async function addUser (ssh: NodeSSH, {
	user,
	publicKey,
	groups
}: User) {
	let groupadd: Promise<any> | any = await ssh.execCommand(`sudo groupadd ${user}`);
	console.log('================================');
	const useradd: Promise<any> | any = await ssh.execCommand(`sudo useradd -mg ${user} ${user}`);
	console.log('================================');
	groupadd = await addGroups(ssh, groups);
	console.log('================================');
	const usermod: Promise<any> | any = await addUserToGroups(ssh, {
		user,
		groups
	});
	console.log('================================');
	if (typeof publicKey == 'string' && publicKey) {
		const pubKey = loadPublicKeyFromLocalPath(publicKey);
		await addPublicKeyToSSH(ssh, {
			user,
			groups: [user],
			publicKey: pubKey
		});
		console.log('================================');
		const {
			host,
			privateKey
		} = loadSSHConfig();
		const _ssh = await ssh.connect({
			host,
			username: user,
			privateKey
		});
		await _ssh.exec('sh -c "$(curl -LsSf https://raw.githubusercontent.com/raccl/setup/ubuntu/install.sh)"', [], {
			onStderr (chunk: any) {
				console.error('================================');
				console.error(chunk.toString('utf8'));
				console.error('================================');
			},
			onStdout (chunk: any) {
				console.log(chunk.toString('utf8'));
			}
		});
		console.log('================================');
	}
	return {
		useradd,
		groupadd,
		usermod
	};
}
