let { Model } = require("objection");

class Employees extends Model {
	static get tableName() {
		return "employees";
	}
	static get idColumn() {
		return "emp_id";
	}
	static get relationMappings() {
		return {
			projects: {
				relation: Model.ManyToManyRelation,
				modelClass: require("./projects"),
				join: {
					from: "employees.emp_id",
					through: {
						from: "employee_n_projects.emp_id",
						to: "employee_n_projects.assigned_project_id",
					},
					to: "projects.project_id",
				},
			},
		};
	}
}

module.exports = Employees;
