import { loadModule } from '@corcc/loader';
import { SSHConfigType } from './Type';
export function loadSSHConfig (path?: string): SSHConfigType {
	const sshConfig: SSHConfigType = loadModule(path ?? 'SSHConfig');
	return sshConfig;
}
export function getSSHUserConfig (user: string, path?: string) {
	const { users }: any = loadSSHConfig(path);
	const userConfig: any = users[user];
	return userConfig;
}
