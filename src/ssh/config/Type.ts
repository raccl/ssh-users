export const defaultGroups = [
	'chsh',
	'pacman',
	'npm',
	'yarn',
	'apt'
];
export type User = {
	privateKey: string;
	publicKey: string;
	groups: string[];
}
export type Users = {
	readonly 'addUser': ({
		prefix,
		user,
		groups
	}: {
		prefix?: string;
		user: string;
		groups?: string[];
	}) => any;
	[user: string]: |
	any |
	Function |
	User;
}
export type SSHConfigType = {
	host?: string;
	users?: Users;
}
