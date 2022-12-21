let knex = require("knex");
const { Model } = require("objection");
let knexConfig = require("./knexfile").development;
let db = knex(knexConfig);
Model.knex(db);

let Employees = require("./models/employees");

async function all_employees() {
	return await Employees.query().orderBy("emp_id");
}

async function employee_by_id(id) {
	return await Employees.query().findById(id);
}
async function employee_by_email(email) {
	return await Employees.query().where("email", email);
}

async function insert_employees(data) {
	return await Employees.query().insert(data);
}

async function delete_employees(id) {
	return await Employees.query().deleteById(id);
}

async function update_employees(data, id) {
	return await Employees.query().findById(id).patch(data);
}

module.exports = {
	all_employees,
	employee_by_email,
	insert_employees,
	employee_by_id,
	delete_employees,
	update_employees,
};
