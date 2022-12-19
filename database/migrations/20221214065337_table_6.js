exports.up = function (knex) {
	return knex.schema.createTable("clients", (tbl) => {
		tbl.integer("client_id").notNullable().unique().primary();
		tbl.string("client_name").notNullable();
		tbl.string("client_email").notNullable().unique();
		tbl.string("client_address").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("clients");
};
