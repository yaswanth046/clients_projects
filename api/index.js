let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let swaggerUI = require("swagger-ui-express");
let swaggerJsDoc = require("swagger-jsdoc");
let axios = require("axios");
let options = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Projects & Clients for a Company API",
			version: "1.0.0",
			description:
				"We can know different Projects and Clients for a Company",
		},
		servers: [
			{
				url: "http://localhost:8000",
			},
		],
	},
	apis: ["swagger.js"],
};
let specs = swaggerJsDoc(options);
let path = require("path");
let cookie_parser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cookie_parser());
app.use(express.static(__dirname + "/public"));

let Employees = require("../database/employees");
let Clients = require("../database/clients");
let Projects = require("../database/projects");
let Employee_n_Projects = require("../database/employee_n_projects");
let Employees_view = require("../database/reports_to");
let xl_to_db = require("../services/xl_to_db");
let pdf = require("../services/pdf");
let mail = require("../services/mail");
let toexcel = require("../services/db_to_xl");
let upload = require("../services/upload");
let login = require("../services/login");
let { createToken, validateToken } = require("../jwttoken/logintoken");

app.get("/to_db/:filename", async (req, res) => {
	let response = await xl_to_db(req.params.filename);
	if (response == "failed") {
		return res.status(400).json("No Data in the selected file");
	}
	if (response == "no file found") {
		return res.status(400).json("No File found for the given name");
	}
	if (response == "success") {
		return res.status(200).json("Data inserted Successfully");
	} else {
		return res.status(500).json(`Something Went Wrong,error:${response}`);
	}
});

app.get("/", (req, res) => {
	res.status(200).json("App is Working");
});

/** Api's for Employees */

app.get("/employees", validateToken, async (req, res) => {
	try {
		let response = await Employees.all_employees();
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.get("/employees/:id", async (req, res) => {
	try {
		let response = await Employees.employee_by_id(req.params.id);
		if (!response) {
			res.status(400).json(`Given Employee Id doesn't exists`);
		} else {
			res.status(200).json(response);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.delete("/employees/:id", async (req, res) => {
	try {
		let response = await Employees.delete_employees(req.params.id);
		if (!response) {
			res.status(400).json(`Given Employee Id doesn't exists`);
		} else {
			res.status(200).json(`${response} records Deleted`);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.post("/employees", async (req, res) => {
	try {
		let response = await Employees.insert_employees(req.body);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.put("/employees/:id", async (req, res) => {
	try {
		let response = await Employees.update_employees(req.body, req.params.id);
		if (!response) {
			res.status(400).json(`Given Employee Id doesn't exists`);
		} else {
			res.status(200).json(`${response} record Updated`);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

app.get("/employees_view", async (req, res) => {
	try {
		let response = await Employees_view();
		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err);
	}
});

/** Api's for Clients */

app.get("/clients", async (req, res) => {
	try {
		let response = await Clients.all_clients();
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.get("/clients/:id", async (req, res) => {
	try {
		let response = await Clients.client_by_id(req.params.id);
		if (!response) {
			res.status(400).json(`Given Client Id doesn't exists`);
		} else {
			res.status(200).json(response);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.delete("/clients/:id", async (req, res) => {
	try {
		let response = await Clients.delete_clients(req.params.id);
		if (!response) {
			res.status(400).json(`Given Client Id doesn't exists`);
		} else {
			res.status(200).json(`${response} records Deleted`);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.post("/clients", async (req, res) => {
	try {
		let response = await Clients.insert_clients(req.body);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.put("/clients/:id", async (req, res) => {
	try {
		let response = await Clients.update_clients(req.body, req.params.id);
		if (!response) {
			res.status(400).json(`Given Client Id doesn't exists`);
		} else {
			res.status(200).json(`${response} record Updated`);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

/** Api's for Projects */

app.get("/projects", async (req, res) => {
	try {
		let response = await Projects.all_projects();
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.get("/projects/:id", async (req, res) => {
	try {
		let response = await Projects.project_by_id(req.params.id);
		if (!response) {
			return res.status(400).json(`Given Project Id doesn't exists`);
		} else {
			res.status(200).json(response);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.delete("/projects/:id", async (req, res) => {
	try {
		let response = await Projects.delete_projects(req.params.id);
		if (!response) {
			return res.status(400).json(`Given Project Id doesn't exists`);
		} else {
			return res.status(200).json(`${response} records Deleted`);
		}
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.post("/projects", async (req, res) => {
	try {
		let response = await Projects.insert_projects(req.body);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.put("/projects/:id", async (req, res) => {
	try {
		let response = await Projects.update_projects(req.body, req.params.id);
		if (!response) {
			return res.status(400).json(`Given Project Id doesn't exists`);
		} else {
			return res.status(200).json(`${response} record Updated`);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

/**  from here test cases and swagger documentation pending  */
/** Api's for Employee_n_Projects */

app.post("/employee_n_projects", async (req, res) => {
	try {
		let response = await Employee_n_Projects.insert_employee_n_projects(
			req.body
		);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.get("/employee_n_projects", async (req, res) => {
	try {
		let response = await Employee_n_Projects.all_employee_n_projects();
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

/** Api's for Joins */

app.get("/project_details/:id", async (req, res) => {
	try {
		let response = await Projects.project_details(req.params.id);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

app.get("/employee_in_project/:id", async (req, res) => {
	try {
		let response = await Employee_n_Projects.employee_in_project(
			req.params.id
		);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(`Something Went Wrong,error:${err.message}`);
	}
});

/** Api for Pdf */
app.get("/teamdetails/:id", async (req, res) => {
	let response = await pdf(req.params.id);
	if (response == "no project_id") {
		return res.status(400).json("Given Project Id doesn't exists");
	} else if (response == "no employees") {
		return res
			.status(401)
			.json("No Employees are assigned to the given Project Id");
	} else if (response == "pdf generated") {
		return res
			.status(200)
			.json(
				"Pdf containing the list of Team members of given Project Id generated"
			);
	} else {
		res.send(response);
	}
});

/** Api for Mail */
app.get("/mail/:id/:p_id", async (req, res) => {
	let response = await mail(req.params.id, req.params.p_id);
	res.send(response);
});

/** Api's for Axios */
app.get("/axios", (req, res) => {
	axios
		.get(`http://localhost:3000`)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

/** Api for data DB to Excel */
app.get("/toexcel", async (req, res) => {
	res.send(await toexcel());
});

/** Api's for upload */
app.get("/upload", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/upload.html"));
});

app.post("/upload", upload.array("file"), async (req, res) => {
	return res.json({ status: "OK", uploaded: req.files.length });
});

/** Api for Login */
app.get("/loginpage", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/login.html"));
});

app.post("/login", async (req, res) => {
	try {
		let response = await login(
			req.body.name,
			req.body.email,
			req.body.mobile_number
		);
		if (response == 400) {
			res.status(400).json("Employee not found");
		} else if (response == 401) {
			res.status(401).json(
				"Name and Mobile Number not Matched,Please try again"
			);
		} else {
			let accessToken = createToken(response);
			console.log(accessToken);
			res.cookie("logintoken", accessToken, {
				httpOnly: true,
				maxAge: 60000,
			});

			res.status(200).send(`Employee logged in Successfully`);
		}
	} catch (err) {
		res.status(500).json(`error:${err.message}`);
	}
});

module.exports = app;
