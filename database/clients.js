let knex = require("knex");
const { Model } = require("objection");
let knexConfig = require("./knexfile").development;
let db = knex(knexConfig);
Model.knex(db);

let Clients = require("./models/clients");

async function all_clients() {
	return await Clients.query()
		.select("clients.*", "projects.*")
		.fullOuterJoin("projects", "clients.client_id", "projects.client_id");
}

async function client_by_id(id) {
	return await Clients.query().findById(id);
}

async function insert_clients(data) {
	return await Clients.query().insert(data);
}

async function delete_clients(id) {
	return await Clients.query().deleteById(id);
}

async function update_clients(data, id) {
	return await Clients.query().findById(id).patch(data);
}

module.exports = {
	all_clients,
	client_by_id,
	insert_clients,
	delete_clients,
	update_clients,
};
