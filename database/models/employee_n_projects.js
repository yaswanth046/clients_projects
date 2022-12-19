let { Model } = require("objection");

class Employee_n_Projects extends Model {
	static get tableName() {
		return "employee_n_projects";
	}
	static get idColumn() {
		return ["emp_id"];
	}
	static get relationMappings() {
		return {
			employees: {
				relation: Model.HasOneRelation,
				modelClass: require("./employees"),
				join: {
					from: "employee_n_projects.emp_id",
					to: "employees.emp_id",
				},
			},
			projects: {
				relation: Model.HasOneRelation,
				modelClass: require("./projects"),
				join: {
					from: "employee_n_projects.assigned_project_id",
					to: "projects.project_id",
				},
			},
		};
	}
}

module.exports = Employee_n_Projects;
