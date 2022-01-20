import { loadModule } from '@corcc/loader';
export type SSHConfig = {
	host: string,
	users?: {
		[user: string]: {
			privateKey: string,
			publicKey?: string,
			groups?: string[],
		}
	},
}
export function loadSSHConfig (path?: string): SSHConfig {
	const sshConfig: SSHConfig = loadModule(path ?? 'SSHConfig');
	return sshConfig;
}
export function getSSHUserConfig (user: string, path?: string) {
	const { users }: any = loadSSHConfig(path);
	const userConfig: any = users[user];
	return userConfig;
}
