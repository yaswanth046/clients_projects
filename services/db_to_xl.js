let excelJS = require("exceljs");
let Projects = require("../database/projects");

async function db_to_xl() {
	try {
		const workbook = new excelJS.Workbook();
		const worksheet = workbook.addWorksheet("Project details");
		const path = "./excel";

		worksheet.columns = [
			{ header: "Project Id.", key: "project_id", width: 10 },
			{ header: "Project Name", key: "project_name", width: 10 },
			{ header: "Project Start Date", key: "start_date", width: 10 },
			{ header: "Project End Date", key: "end_date", width: 10 },
			{ header: "Project Status", key: "project_status", width: 10 },
			{ header: "Client Id", key: "client_id", width: 10 },
		];

		const project_details = await Projects.all_projects();

		project_details.forEach((row) => {
			worksheet.addRow(row);
		});

		worksheet.getRow(1).eachCell((cell) => {
			cell.font = { bold: true };
		});

		await workbook.xlsx.writeFile(`${path}/Project details.xlsx`);
		return {
			status: "Success",
			message: "file successfully downloaded",
			path: `${path}/Booking details.xlsx`,
		};
	} catch (err) {
		return {
			status: "Failed",
			message: err.message,
		};
	}
}

module.exports = db_to_xl;
