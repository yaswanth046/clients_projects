let nodemailer = require("nodemailer");
let fs = require("fs");
let Employees = require("../database/employees");

async function mail(emp_id, p_id) {
	try {
		let employee = await Employees.employee_by_id(emp_id);
		let email = employee.email;
		var body = fs.readFileSync("./html/mail.html", "utf8");

		let transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "yaswanth46.p@outlook.com",
				pass: "Yaswanth@22",
			},
		});

		let info = await transporter.sendMail({
			from: "yaswanth46.p@outlook.com",
			to: email,
			subject: "Welcome to Team",
			html: body,
			attachments: [
				{
					filename: `Project-${p_id} Team_details.pdf`,
					path: `D:/practise files/Company_Projects_n_Client API/team_details/Project-${p_id} Team_details.pdf`,
				},
			],
		});

		return `Mail Sent`;
	} catch (err) {
		return err.message;
	}
}
module.exports = mail;
