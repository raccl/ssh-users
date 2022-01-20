
export const defaultOptions = {
	onStderr: function (chunk: any) {
		console.error(chunk.toString('utf8'));
	},
	onStdout: function (chunk: any) {
		console.log(chunk.toString('utf8'));
	}
};
