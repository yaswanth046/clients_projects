module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: "projects_n_clients",
			user: "postgres",
			password: "yaswanth7",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};
