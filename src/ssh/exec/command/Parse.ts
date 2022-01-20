import { Command, Params, User } from './Type';

export function getUser (command: Command & Params & User) {
	if (typeof command.user == 'string') {
		return command.user;
	}
}
export function getCommand (command: Command & Params & User) {
	if (typeof command == 'string') {
		return command;
	}
	if (typeof command.command == 'string') {
		return command.command;
	}
}
export function getParams (command: Command & Params & User) {
	if (typeof command.params == 'string') {
		return command.params;
	}
}
