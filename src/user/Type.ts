
import { Group } from '../group/Type';
export type User = {
	user: string;
	publicKey?: string;
	groups?: Group[];
}
