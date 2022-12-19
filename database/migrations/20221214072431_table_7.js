exports.up = function (knex) {
	return knex.schema.createTable("projects", (tbl) => {
		tbl.integer("project_id").notNullable().unique().primary();
		tbl.string("project_name").notNullable();
		tbl.date("start_date").notNullable();
		tbl.date("end_date").notNullable();
		tbl.string("project_status").notNullable();
		tbl.integer("client_id")
			.notNullable()
			.unsigned()
			.references("clients.client_id")
			.deferrable("deferred")
			.onDelete("CASCADE");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("projects");
};
