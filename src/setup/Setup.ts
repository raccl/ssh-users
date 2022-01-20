import { NodeSSH } from 'node-ssh';
import { runCommand } from '../ssh/exec/command';

export async function setup (
	ssh: NodeSSH,
	user?: string
) {
	const protocol = 'https:';
	const host = 'raw.githubusercontent.com';
	const path = 'raccl/setup/ubuntu/install.sh';
	const url = `${protocol}//${host}/${path}`;
	const cmd = `sh -c "$(curl -LsSf ${url})"`;
	console.log(user);
	await runCommand(ssh, {
		command: cmd,
		user
	});
}
