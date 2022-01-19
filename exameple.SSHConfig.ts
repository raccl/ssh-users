module.exports = {
	host: 'localhost',
	username: 'ubuntu',
	privateKey: '/home/archlinux/.ssh/id_rsa',
	publicKey: '/home/archlinux/.ssh/id_rsa.pub',
	user: 'usertoadd',
	groups: [
		'chsh',
		'pacman',
		'npm',
		'yarn',
		'apt'
	]
};
