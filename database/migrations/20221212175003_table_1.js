exports.up = function (knex) {
	return knex.schema.createTable("employees", (tbl) => {
		tbl.increments("emp_id").notNullable();
		tbl.string("first_name").notNullable();
		tbl.string("last_name").notNullable();
		tbl.string("designation").notNullable();
		tbl.string("email").notNullable();
		tbl.string("mobile_number").notNullable();
		tbl.string("address").notNullable();
		tbl.integer("reports_to").references("emp_id").inTable("employees");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("employees");
};
