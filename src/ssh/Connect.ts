import { NodeSSH } from 'node-ssh';
import { SSHConfig } from './config/SSH';
const ssh:NodeSSH = new NodeSSH();

export async function connectSSH ({
	host,
	username,
	privateKey
}: SSHConfig): Promise<NodeSSH> {
	return await ssh.connect({
		host,
		username,
		privateKey
	});
}
