let knex = require("knex");
const { Model } = require("objection");
let knexConfig = require("./knexfile").development;
let db = knex(knexConfig);
Model.knex(db);

let Projects = require("./models/projects");

async function all_projects() {
	return await Projects.query().orderBy("project_id");
}
async function project_details(id) {
	return await Projects.query()
		.findById(id)
		.select("projects.*", "clients.*")
		.joinRelated("clients");
}
async function project_by_id(id) {
	return await Projects.query().findById(id);
}

async function insert_projects(data) {
	return await Projects.query().insert(data);
}

async function delete_projects(id) {
	return await Projects.query().deleteById(id);
}

async function update_projects(data, id) {
	return await Projects.query().findById(id).patch(data);
}

module.exports = {
	all_projects,
	project_by_id,
	insert_projects,
	delete_projects,
	update_projects,
	project_details,
};
