const { sign, verify } = require("jsonwebtoken");

function createToken(employee) {
	let accessToken = sign(
		{ name: employee[0].first_name, id: employee[0].emp_id },
		"yaswanthtoken"
	);
	return accessToken;
}

function validateToken(req, res, next) {
	const accessToken = req.cookies.logintoken;

	if (!accessToken) {
		return res.status(400).json("User Not Authenticated");
	}
	try {
		const validToken = verify(accessToken, "yaswanthtoken");
		if (validToken) {
			req.authenticated = true;
			return next();
		}
	} catch (err) {
		return res.status(400).json(`error:${err.message}`);
	}
}
module.exports = { createToken, validateToken };
