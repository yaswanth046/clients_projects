exports.up = function (knex) {
	return knex.schema.createTable("employees", (tbl) => {
		tbl.increments("emp_id").notNullable();
		tbl.string("first_name").notNullable();
		tbl.string("last_name").notNullable();
		tbl.string("designation").notNullable();
		tbl.string("email").notNullable().unique();
		tbl.string("mobile_number").notNullable().unique();
		tbl.string("address").notNullable();
		tbl.integer("reports_to")
			.unsigned()
			.references("employees.emp_id")
			.deferrable("deferred");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("employees");
};
