const argv = process.argv.slice(2);

const st = message.startsWith("-") ? message : `-${ message }`;

if (argv.includes(st)) {
	if (bool) {
		var index = argv.findIndex(function (argv) {
			return argv.includes(st);
		});
		
		const res = argv[index + 1];
		return res;
	} else {
		return true;
	}
}
