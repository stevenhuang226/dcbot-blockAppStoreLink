function (data, logPath) { // return -1: path not access -2: error when write data 0: write success
	const fs = require("node:fs");
	fs.access(logPath, fs.constants.F_OK, function(error) {
		if (error) {
			return -1;
		}
		else {
			try {
				fs.writeFileSync(filePath, data);
			}
			catch (error) {
				return -2;
			}
			return 0;
		}
	})
}
