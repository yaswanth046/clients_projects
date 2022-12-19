let { Model } = require("objection");

class Clients extends Model {
	static get tableName() {
		return "clients";
	}
	static get idColumn() {
		return "client_id";
	}
	static get relationMappings() {
		return {
			projects: {
				relation: Model.HasManyRelation,
				modelClass: require("./projects"),
				join: {
					from: "clients.client_id",
					to: "projects.client_id",
				},
			},
		};
	}
}

module.exports = Clients;
