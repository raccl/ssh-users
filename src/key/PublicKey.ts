import fs from 'fs';
import { NodeSSH } from 'node-ssh';
import { User } from '../user/User';
export async function addPublicKeyToSSH (ssh: NodeSSH, {
	user,
	publicKey
}: User) {
	if (typeof publicKey == 'string' && publicKey) {
		const mkdir: any = await ssh.execCommand(`sudo mkdir -p /home/${user}/.ssh || true `);
		const sendFile = await ssh.execCommand(`echo '${publicKey}' | sudo tee /home/${user}/.ssh/authorized_keys`);
		const chown: any = await ssh.execCommand(`sudo chown -R ${user}:${user} /home/${user}`);
		return {
			mkdir,
			chown,
			sendFile
		};
	}
}
export function loadPublicKeyFromLocalPath (publicKeyPath: string) {
	const publicKeyBuffer: Buffer = fs.readFileSync(publicKeyPath);
	const publicKeyString: string = publicKeyBuffer.toString();
	return publicKeyString;
}
