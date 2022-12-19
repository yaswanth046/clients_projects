let knex = require("knex");
const { Model } = require("objection");
let knexConfig = require("./knexfile").development;
let db = knex(knexConfig);
Model.knex(db);

let Employee_n_Projects = require("./models/employee_n_projects");

async function all_employee_n_projects() {
	return await Employee_n_Projects.query()
		.withGraphJoined("[employees,projects]")
		.orderBy("emp_id");
}

async function employee_in_project(id) {
	return await Employee_n_Projects.query()
		.select("employees.*", "project_id")
		.joinRelated("[employees,projects]")
		.where("project_id", id);
}

async function insert_employee_n_projects(data) {
	return await Employee_n_Projects.query().insert(data);
}

module.exports = {
	all_employee_n_projects,
	insert_employee_n_projects,
	employee_in_project,
};
