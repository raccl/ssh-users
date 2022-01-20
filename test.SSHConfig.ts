module.exports = {
	host: 'instance',
	users: {
		ubuntu: {
			privateKey: '/home/archlinux/.ssh/ubuntu_rsa',
			publicKey: '/home/archlinux/.ssh/ubuntu_rsa.pub'
		},
		corcc: {
			privateKey: '/home/archlinux/.ssh/corcc_rsa',
			publicKey: '/home/archlinux/.ssh/corcc_rsa.pub',
			groups: [
				'chsh',
				'pacman',
				'npm',
				'yarn',
				'apt'
			]
		},
		raccl: {
			privateKey: '/home/archlinux/.ssh/raccl_rsa',
			publicKey: '/home/archlinux/.ssh/raccl_rsa.pub',
			groups: [
				'chsh',
				'pacman',
				'npm',
				'yarn',
				'apt'
			]
		}
	}
};
