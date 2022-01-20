import { NodeSSH } from 'node-ssh';
import { connectSSHWith } from '../../Connect';
import { defaultOptions } from './Default';
import { getCommand, getParams, getUser } from './Parse';
import { Command, Params, User } from './Type';

export async function runCommand (
	ssh: NodeSSH,
	__p: any | Command & Params
): Promise<any> {
	let _ssh: any | NodeSSH = ssh;
	const u: any = getUser(__p);
	const c: any = getCommand(__p);
	const p: any = getParams(__p);
	if (u) {
		_ssh = await connectSSHWith({
			user: u
		});
	}
	if (!c) {
		throw new Error(`Invalid command ${c}`);
	}
	let result;
	try {
		result = await _ssh.exec(
			c,
			p ?? [''],
			defaultOptions
		);
	} catch (err: any) {
		console.error(err.message);
		return result;
	}
	return result;
}

export async function runCommands (
	ssh: NodeSSH,
	__p: Command & Params & User
) {
	const {
		commands
	}: any = __p;
	const runCommandsResult = await commands.map(
		async (_c: any) => {
			let _o: any = _c;
			if (typeof _c == 'string') {
				_o = {
					command: _c
				};
			}
			const runCommandResult = await runCommand(ssh, _o);
			return runCommandResult;
		});
	return runCommandsResult;
}
