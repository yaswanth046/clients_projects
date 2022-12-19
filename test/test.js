let { describe, it } = require("mocha");
let chaiHttp = require("chai-http");
let chai = require("chai");
let expect = chai.expect;
let server = require("../api/index");

chai.should();
chai.use(chaiHttp);

describe("Home route", () => {
	it("Should get a message", (done) => {
		chai
			.request(server)
			.get("/")
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Get All Employees", () => {
	it("Should get all records of Employees", (done) => {
		chai
			.request(server)
			.get("/employees")
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("array");
				done();
			});
	});
});

describe("Get Employee details by Id", () => {
	it("Should get Employee details of given Id", (done) => {
		const id = 3;
		chai
			.request(server)
			.get(`/employees/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Employees View", () => {
	it("Should get all records from Employees_view table", (done) => {
		chai
			.request(server)
			.get("/employees_view")
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("array");
				done();
			});
	});
});

describe("Data import from excel to db", () => {
	it("Should import data from excel to db", (done) => {
		const filename = "employees";
		chai
			.request(server)
			.get(`/to_db/${filename}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Insert to Employees", () => {
	it("Should able to Insert data into Employees Table", (done) => {
		const input = {
			emp_id: 1000,
			first_name: "Sri Hari",
			last_name: "T",
			designation: "Devops",
			email: "srihariii.tttrrrt@gmail.com",
			mobile_number: "9000000105",
			address: "Vijayawada",
			reports_to: 34,
		};
		chai
			.request(server)
			.post("/employees")
			.send(input)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Update Employee details by Id", () => {
	it("Should update Employee details of given Id", (done) => {
		const id = 1000;
		const data = {
			reports_to: 7,
		};
		chai
			.request(server)
			.put(`/employees/${id}`)
			.send(data)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Delete Employee details by Id", () => {
	it("Should delete Employee details of given Id", (done) => {
		const id = 1000;
		chai
			.request(server)
			.delete(`/employees/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Get Clients", () => {
	it("Should get all records of Clients", (done) => {
		chai
			.request(server)
			.get("/clients")
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("array");
				done();
			});
	});
});

describe("Get Client details by Id", () => {
	it("Should get Client details of given Id", (done) => {
		const id = 22001;
		chai
			.request(server)
			.get(`/clients/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Insert to Clients", () => {
	it("Should able to Insert data into Clients Table", (done) => {
		const input = {
			client_id: 22002,
			client_name: "JBC Morgan",
			client_email: "jbcmorgan@gmail.com",
			client_address: "U.S.A",
		};
		chai
			.request(server)
			.post("/clients")
			.send(input)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Update Client details by Id", () => {
	it("Should update Client details of given Id", (done) => {
		const id = 22002;
		const data = {
			client_address: "N.Y",
		};
		chai
			.request(server)
			.put(`/clients/${id}`)
			.send(data)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Delete Client details by Id", () => {
	it("Should delete Client details of given Id", (done) => {
		const id = 22002;
		chai
			.request(server)
			.delete(`/clients/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Get Projects", () => {
	it("Should get all records of Projects", (done) => {
		chai
			.request(server)
			.get("/projects")
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("array");
				done();
			});
	});
});

describe("Get Project details by Id", () => {
	it("Should get Project details of given Id", (done) => {
		const id = 101;
		chai
			.request(server)
			.get(`/projects/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Insert to Projects", () => {
	it("Should able to Insert data into Projects Table", (done) => {
		const input = {
			project_id: 106,
			project_name: "Rent Hub",
			start_date: "2021.01.01",
			end_date: "2023.07.01",
			project_status: "Ongoing",
			client_id: 22001,
		};
		chai
			.request(server)
			.post("/projects")
			.send(input)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				done();
			});
	});
});

describe("Update Project details by Id", () => {
	it("Should update Project details of given Id", (done) => {
		const id = 106;
		const data = {
			project_status: "Open",
		};
		chai
			.request(server)
			.put(`/projects/${id}`)
			.send(data)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});

describe("Delete Project details by Id", () => {
	it("Should delete Project details of given Id", (done) => {
		const id = 106;
		chai
			.request(server)
			.delete(`/projects/${id}`)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("string");
				done();
			});
	});
});
