let { Model } = require("objection");

class Employee_reports_to extends Model {
	static get tableName() {
		return "employees_reporting_to";
	}
	static get idColumn() {
		return "emp_id";
	}
}

module.exports = Employee_reports_to;
