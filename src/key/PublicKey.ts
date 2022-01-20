import fs from 'fs';
import { NodeSSH } from 'node-ssh';
import { loadSSHConfig } from '../ssh/config/SSH';
import { runCommand } from '../ssh/exec/command';
import { User } from '../user/Type';
export async function setUserPublicKey (ssh: NodeSSH, {
	user
}: User) {
	const pubKey = getUserPublicKey(user);
	if (typeof pubKey == 'string' && pubKey) {
		const mkdir: any = await runCommand(ssh, {
			command: `sudo mkdir -p /home/${user}/.ssh || true `
		});
		const write: any = await runCommand(ssh, {
			command: `echo '${pubKey}' | sudo tee /home/${user}/.ssh/authorized_keys`
		});
		const chown: any = await runCommand(ssh, {
			command: `sudo chown -R ${user}:${user} /home/${user}`
		});
		return {
			mkdir,
			write,
			chown
		};
	}
}
export function getUserPublicKey (user: string) {
	const { users }: any = loadSSHConfig();
	if (!users[user] || !user) {
		throw Error(`Could not find ${user}`);
	}
	const _u = users[user];
	const { publicKey } = _u;
	const b: Buffer = fs.readFileSync(publicKey);
	const s: string = b.toString();
	return s;
}
