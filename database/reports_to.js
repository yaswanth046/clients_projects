let knex = require("knex");
const { Model } = require("objection");
let knexConfig = require("./knexfile").development;
let db = knex(knexConfig);
Model.knex(db);

let Reports_to = require("./models/reports_to");
async function employee_view() {
	return await Reports_to.query();
}

module.exports = employee_view;
