import { loadModule } from '@corcc/loader';
export type SSHConfig = {
	host: string,
	username: string,
	user?: string,
	groups?: string[],
	privateKey: string,
	publicKey?: string,
}
export function loadSSHConfig (path?: string): SSHConfig {
	const sshConfig: SSHConfig = loadModule('SSHConfig');
	return sshConfig;
}
