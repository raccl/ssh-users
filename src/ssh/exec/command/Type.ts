
export type User = {
 user?: string;
}
export type Params = {
 params?: string[];
}
export type Command = User & Params & {
	command?: |
	string |
	Command;
	commands?: |
	string[] |
	Command[];
}
