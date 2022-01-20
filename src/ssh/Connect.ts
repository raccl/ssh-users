import { NodeSSH } from 'node-ssh';
import { loadSSHConfig } from './config/SSH';
const ssh: NodeSSH = new NodeSSH();

export async function connectSSHWith ({
	user
}: {
	user: string
}, path?: string) {
	let _ssh: NodeSSH = ssh;
	const { host, users }: any = loadSSHConfig(path);
	if (user) {
		if (users[user]) {
			const { privateKey } = users[user];
			_ssh = await ssh.connect({
				host,
				username: user,
				privateKey
			});
			return _ssh;
		}
	}
	throw Error('Invalid config in ./SSHConfig');
}
