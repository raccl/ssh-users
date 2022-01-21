import { defaultGroups, SSHConfigType, Users } from './Type';
const { HOME } = process.env;

export class SSHConfig implements SSHConfigType {
	host = '';
	users: Users = {
		addUser: ({
			prefix,
			user,
			groups
		}: any) => {
			const _C = function (u: string) {
				const _c: any = {
					groups: groups ?? defaultGroups
				};
				_c.privateKey = `${HOME}/.ssh/${prefix}/${u}_rsa`;
				_c.publicKey = `${HOME}/.ssh/${prefix}/${u}_rsa.pub`;
				return _c;
			};
			this.users[user] = _C(user);
			return this.users;
		}
	}
}
