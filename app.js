let app = require("./api/index.js");
let port = 8000;

app.listen(port, (req, res) => {
	console.log(`App is running and listening on ${port}`);
});
