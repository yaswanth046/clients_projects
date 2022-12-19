let xlsx = require("xlsx");
let employees = require("../database/employees");

async function excel_to_db(filename) {
	try {
		let path = `D:/practise files/Company_Projects_n_Client API/excel/${filename}.xlsx`;
		let workbook = xlsx.readFile(path);
		let sheets = workbook.SheetNames;
		let worksheet = workbook.Sheets[sheets[0]];
		let jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

		if (jsonData.length == 0) {
			return "failed";
		}
		if (filename == "employees") {
			await employees.insert_employees(jsonData);
			return "success";
		} else {
			return "no file found";
		}
	} catch (err) {
		return err.name;
	}
}

module.exports = excel_to_db;
