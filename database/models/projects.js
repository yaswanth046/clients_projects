let { Model } = require("objection");

class Projects extends Model {
	static get tableName() {
		return "projects";
	}
	static get idColumn() {
		return "project_id";
	}
	static get relationMappings() {
		return {
			clients: {
				relation: Model.BelongsToOneRelation,
				modelClass: require("./clients"),
				join: {
					from: "projects.client_id",
					to: "clients.client_id",
				},
			},
		};
	}
}

module.exports = Projects;
