import { NodeSSH, SSHExecCommandResponse } from 'node-ssh';
import { User } from '../user/User';

export type Group = string
export async function addGroups (ssh: NodeSSH, groups: Group[]): Promise<any> {
	let groupadd: Promise<any>[] | any[] = await groups.map(async (group: string): Promise<any> => {
		const _a: SSHExecCommandResponse = await ssh.execCommand(`sudo groupadd ${group} || true`);
		return _a;
	});
	groupadd = await Promise.all(groupadd);
	return groupadd;
}
export async function deleteGroups (ssh: NodeSSH, groups: Group[]): Promise<any> {
	let groupdel: Promise<any>[] | any[] = await groups.map(async (group: string): Promise<any> => {
		const _a: any = await ssh.execCommand(`sudo groupdel ${group} || true`);
		return _a;
	});
	groupdel = await Promise.all(groupdel);
	return {
		groupdel
	};
}

export async function addUserToGroups (ssh: NodeSSH, {
	user,
	groups
}: User) {
	let usermod: Promise<any>[] | any[] = await groups.map(async (group: string): Promise<any> => {
		const _a: any = await ssh.execCommand(`sudo usermod -aG ${group} ${user} || true`);
		return _a;
	});
	usermod = await Promise.all(usermod);
	return {
		usermod
	};
}
