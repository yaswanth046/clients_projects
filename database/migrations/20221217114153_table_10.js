exports.up = function (knex) {
	return knex.schema.createTable("index", (tbl) => {
		tbl.increments("s_no").notNullable();
		tbl.string("description").notNullable();
		tbl.string("quantity");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("index");
};
