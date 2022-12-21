let Employees = require("../database/employees");

async function login(username, email, mobilenumber) {
	const employee_data = await Employees.employee_by_email(email);
	if (employee_data.length == 0) {
		return 400;
	} else if (
		employee_data[0].first_name !== username ||
		employee_data[0].mobile_number !== mobilenumber
	) {
		return 401;
	} else {
		return employee_data;
	}
}
module.exports = login;
