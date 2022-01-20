import { NodeSSH } from 'node-ssh';
import { runCommand } from '../../ssh/exec/command';
import { User } from '../../user';

export async function addUserToGroups (
	ssh: NodeSSH,
	__p: User
) {
	const {
		user,
		groups
	}: any | User = __p;
	if (!user || !groups) {
		throw Error(`Paramter ${__p} is not valid`);
	}
	let usermod: Promise<any>[] | any[] = await groups.map(async (group: string): Promise<any> => {
		const _a: any = runCommand(ssh, {
			command: `sudo usermod -aG ${group
			} ${user
			} || true`
		});
		return _a;
	});
	usermod = await Promise.all(usermod);
	return {
		usermod
	};
}
