import { NodeSSH } from 'node-ssh';
import { runCommand } from '../ssh/exec/command';
import { Group } from './Type';

export async function deleteGroups (ssh: NodeSSH, groups: Group[]): Promise<any> {
	let groupdel: Promise<any>[] | any[] = await groups.map(
		async (group: string): Promise<any> => {
			const _a: any = await runCommand(ssh, {
				command: `sudo groupdel ${group} || true`
			});
			return _a;
		});
	groupdel = await Promise.all(groupdel);
	return {
		groupdel
	};
}
