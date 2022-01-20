import { NodeSSH } from 'node-ssh';
import { runCommand } from '../ssh/exec/command';
import { Group } from './Type';

export async function addGroups (ssh: NodeSSH, groups: Group[]): Promise<any> {
	let groupadd: Promise<any>[] | any[] = groups.map(
		async (group: string): Promise<any> => {
			const _a: any = await runCommand(ssh, {
				command: `sudo groupadd ${group} || true`
			});
			return _a;
		});
	groupadd = await Promise.all(groupadd);
	return groupadd;
}
