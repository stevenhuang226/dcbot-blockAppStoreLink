function write (logPath, data) { // return -1: path not access -2: error when write data 0: write success
	const fs = require("node:fs");
	fs.access(logPath, fs.constants.F_OK, function(error) {
		if (error) {
			return -1;
		}
		else {
			try {
				fs.appendFileSync(logPath,Date.now().toString() + data + "\n");
			}
			catch (error) {
				return -2;
			}
			return 0;
		}
	})
};
function pathCheck(logPath) {
	const fs = require("node:fs");
	fs.access(logPath, fs.constants.F_OK, function(error) {
		if (error) {
			return -1;
		}
		else {
			return 0;
		}
	});
}
module.exports = {
	write: write,
	check: pathCheck
}
