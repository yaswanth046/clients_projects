exports.up = function (knex) {
	return knex.schema.createTable("employee_n_projects", (tbl) => {
		tbl.integer("emp_id")
			.primary()
			.notNullable()
			.unsigned()
			.references("employees.emp_id")
			.deferrable("deferred")
			.onDelete("CASCADE");

		tbl.integer("assigned_project_id")
			.primary()
			.notNullable()
			.unsigned()
			.references("projects.project_id")
			.deferrable("deferred")
			.onDelete("CASCADE");
		tbl.date("project_assingned_on");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("employee_n_projects");
};
