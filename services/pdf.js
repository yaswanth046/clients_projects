const fs = require("fs");
const PDFDocument = require("pdfkit");

let Projects = require("../database/projects");
let Employee_n_Projects = require("../database/employee_n_projects");

async function pdf(p_id) {
	try {
		let path = `team_details/Project-${p_id} Team_details.pdf`;
		let project_details = await Projects.project_details(p_id);
		let employee_details = await Employee_n_Projects.employee_in_project(
			p_id
		);
		if (!project_details) {
			return "no project_id";
		} else if (employee_details.length == 0) {
			return "no employees";
		} else {
			createPdf(path, project_details, employee_details);
			return "pdf generated";
		}
	} catch (err) {
		return err.message;
	}
}

function createPdf(path, p_data, e_data) {
	let doc = new PDFDocument({ size: "A4", margin: 50 });

	generateHeader(doc);
	generateProjectInformation(doc, p_data);
	generateReportTable(doc, e_data);
	generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}
function generateHeader(doc) {
	doc.fillColor("#444444")
		.fontSize(20)
		.text("Project & Team Details", 200, 57)
		.moveDown();
}

function generateFooter(doc) {
	doc.fontSize(10).text("This is system generated.", 50, 770, {
		align: "center",
		width: 500,
	});
}
function generateHr(doc, y) {
	doc.strokeColor("#aaaaaa")
		.lineWidth(1)
		.moveTo(50, y)
		.lineTo(550, y)
		.stroke();
}

function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return day + "/" + month + "/" + year;
}

function generateProjectInformation(doc, p_data) {
	doc.fillColor("#444444")
		.fontSize(20)
		.text("Project & Client Details", 50, 160);

	generateHr(doc, 185);

	const projectInformationTop = 200;

	doc.fontSize(10)
		.text("Project ID:", 50, projectInformationTop)
		.font("Helvetica-Bold")
		.text(p_data.project_id, 150, projectInformationTop)
		.font("Helvetica")
		.text("Project Name:", 50, projectInformationTop + 15)
		.text(p_data.project_name, 150, projectInformationTop + 15)
		.text("Project Start Date:", 50, projectInformationTop + 30)
		.font("Helvetica-Bold")
		.text(formatDate(p_data.start_date), 150, projectInformationTop + 30)

		.text("Client ID:", 350, projectInformationTop)
		.font("Helvetica-Bold")
		.text(p_data.client_id, 430, projectInformationTop)
		.font("Helvetica")
		.text("Client Name:", 350, projectInformationTop + 15)
		.text(p_data.client_name, 430, projectInformationTop + 15)
		.text("Client Email:", 350, projectInformationTop + 30)
		.font("Helvetica-Bold")
		.text(p_data.client_email, 430, projectInformationTop + 30)

		.moveDown();

	generateHr(doc, 250);
}

function generateTableRow(doc, y, emp_id, name, designation, email) {
	doc.fontSize(10)
		.text(emp_id, 50, y)
		.text(name, 100, y)
		.text(designation, 260, y)
		.text(email, 420, y);
}

function generateReportTable(doc, e_data) {
	const employeeInformationTop = 300;

	doc.font("Helvetica-Bold");
	generateTableRow(
		doc,
		employeeInformationTop,
		"Emp.Id",
		"Name",
		"Designation",
		"Email"
	);
	generateHr(doc, employeeInformationTop + 20);

	doc.font("Helvetica");
	for (i = 0; i < e_data.length; i++) {
		const position = employeeInformationTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			e_data[i].emp_id,
			e_data[i].first_name,
			e_data[i].designation,
			e_data[i].email
		);
		generateHr(doc, position + 20);
	}
}
module.exports = pdf;
