/**
 * @swagger
 * tags:
 *      name: Employees
 *      description: Url's for Employee's
 */

/** Employees Schema */
/**
 * @swagger
 * components:
 *       schemas:
 *         Employees:
 *                type: object
 *                required:
 *                  - emp_id
 *                  - first_name
 *                  - last_name
 *                  - designation
 *                  - email
 *                  - mobile_number
 *                  - address
 *                  - reports_to
 *                  - projects_assigned
 *                properties:
 *                  emp_id:
 *                    type: integer
 *                    description: Employee Id
 *                  first_name:
 *                    type: string
 *                    description: First name of the Employee
 *                  last_name:
 *                    type: string
 *                    description: Last name of the Employee
 *                  designation:
 *                    type: string
 *                    description: Designation of the Employee
 *                  email:
 *                    type: string
 *                    description: Email of the Employee
 *                  mobile_number:
 *                    type: string
 *                    description: Mobile number of the Employee
 *                  address:
 *                    type: string
 *                    description: Address of the Employee
 *                  reports_to:
 *                    type: integer
 *                    description: Employee Reporting to
 *                  projects_assigned:
 *                    type: integer
 *                    description: Project Id to which Employee was assigned
 *
 *                example:
 *                  emp_id: 2
 *                  first_name: Ashok
 *                  last_name: P
 *                  designation: Manager
 *                  email: ashok.p@gmail.com
 *                  mobile_number: 9000000001
 *                  address: Vishakapatnam
 *                  reports_to: 1
 *                  projects_assigned: 101
 */

/** Employees_view Schema */
/**
 * @swagger
 * components:
 *       schemas:
 *         Employees_view:
 *                type: object
 *                required:
 *                  - emp_id
 *                  - first_name
 *                  - designation
 *                  - reports_to
 *                properties:
 *                  emp_id:
 *                    type: integer
 *                    description: Employee Id
 *                  first_name:
 *                    type: string
 *                    description: First name of the Employee
 *                  designation:
 *                    type: string
 *                    description: Designation of the Employee
 *                  reports_to:
 *                    type: string
 *                    description: Employee Reporting to
 *
 *                example:
 *                  emp_id: 2
 *                  first_name: Ashok
 *                  designation: Manager
 *                  reports_to: Murthy
 */

/** Get Home route */
/**
 * @swagger
 * /:
 *   get:
 *     tags: [Home route]
 *     responses:
 *       200:
 *         description: App is Working message.
 *       500:
 *         description: Something went wrong
 */

/** Get all Employees */
/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: All the records of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Something went wrong
 */

/** Get  Employees_view */
/**
 * @swagger
 * /employees_view:
 *   get:
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of Employees and their Reporting to
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees_view'
 *       500:
 *         description: Something went wrong
 */

/** Get  Excel to Db */
/**
 * @swagger
 * /to_db/{filename}:
 *   get:
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: Filename of the excel
 *     responses:
 *       200:
 *         description: Data inserted into table Sucessfully
 *       400:
 *         description: No Data in the selected file / No file found with the given Name
 *       500:
 *        description: Error Message
 */

/** Get Employee by Id */
/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee Id
 *     responses:
 *       200:
 *         description: Record of the given Employee Id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       400:
 *         description: Given Employee Id doesn't exists
 *       500:
 *         description: Something went wrong
 */

/** Post Employees */
/**
 * @swagger
 * /employees:
 *   post:
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       200:
 *         description: Inserted data will be shown on successful Insert
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Error message
 */

/** Delete Employee by Id */
/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee Id
 *     responses:
 *       200:
 *         description: Returns no.of records Deleted
 *       400:
 *         description: Given Employee Id doesn't exists
 *       500:
 *         description: Error Message
 */

/** Update Employee by Id */
/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee Id
 *     responses:
 *       200:
 *         description: Returns no.of records Updated
 *       400:
 *         description: Given Employee Id doesn't exists
 *       500:
 *         description: Error Message
 */

/** Clients Schema */
/**
 * @swagger
 * components:
 *       schemas:
 *         Clients:
 *                type: object
 *                required:
 *                  - client_id
 *                  - client_name
 *                  - client_email
 *                  - client_address
 *                properties:
 *                  client_id:
 *                    type: integer
 *                    description: Client Id
 *                  client_name:
 *                    type: string
 *                    description: Name of the Client
 *                  client_email:
 *                    type: string
 *                    description: Email of the Client
 *                  client_address:
 *                    type: string
 *                    description: Address of the Client
 *                example:
 *                  client_id: 22001
 *                  client_name: JB Morgan
 *                  client_email: jbmorgan@gmail.com
 *                  client_address: U.S.A
 */

/** Get all Clients */
/**
 * @swagger
 * /clients:
 *   get:
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: All the records of Clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Something went wrong
 */

/** Get Client by Id */
/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client Id
 *     responses:
 *       200:
 *         description: Record of the given Client Id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       400:
 *         description: Given Client Id doesn't exists
 *       500:
 *         description: Something went wrong
 */

/** Post Clients */
/**
 * @swagger
 * /clients:
 *   post:
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *     responses:
 *       200:
 *         description: Inserted data will be shown on successful Insert
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error message
 */

/** Delete Client by Id */
/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client Id
 *     responses:
 *       200:
 *         description: Returns no.of records Deleted
 *       400:
 *         description: Given Client Id doesn't exists
 *       500:
 *         description: Error Message
 */

/** Update Client by Id */
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client Id
 *     responses:
 *       200:
 *         description: Returns no.of records Updated
 *       400:
 *         description: Given Client Id doesn't exists
 *       500:
 *         description: Error Message
 */

/** Projects Schema */
/**
 * @swagger
 * components:
 *       schemas:
 *         Projects:
 *                type: object
 *                required:
 *                  - project_id
 *                  - project_name
 *                  - start_date
 *                  - end_date
 *                  - project_status
 *                  - client_id
 *                properties:
 *                  project_id:
 *                    type: integer
 *                    description: Project Id
 *                  project_name:
 *                    type: string
 *                    description: Name of the Project
 *                  start_date:
 *                    type: date
 *                    description: Start Date of the Project
 *                  end_date:
 *                    type: date
 *                    description: End Date of the Project
 *                  project_status:
 *                    type: string
 *                    description: Status of the Project
 *                  client_id:
 *                    type: integer
 *                    description: Client Id
 *                example:
 *                  project_id: 101
 *                  project_name: Rent Hub
 *                  start_date: 2021.01.01
 *                  end_date: 2023.07.01
 *                  project_status: Ongoing
 *                  client_id: 22001
 */

/** Get all Projects */
/**
 * @swagger
 * /projects:
 *   get:
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: All the records of Projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projects'
 *       500:
 *         description: Something went wrong
 */

/** Get Project by Id */
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Project Id
 *     responses:
 *       200:
 *         description: Record of the given Project Id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projects'
 *       400:
 *         description: Given Project Id doesn't exists
 *       500:
 *         description: Something went wrong
 */

/** Post Clients */
/**
 * @swagger
 * /projects:
 *   post:
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projects'
 *     responses:
 *       200:
 *         description: Inserted data will be shown on successful Insert
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projects'
 *       500:
 *         description: Error message
 */

/** Delete Client by Id */
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Project Id
 *     responses:
 *       200:
 *         description: Returns no.of records Deleted
 *       400:
 *         description: Given Project Id doesn't exists
 *       500:
 *         description: Error Message
 */

/** Update Client by Id */
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projects'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Project Id
 *     responses:
 *       200:
 *         description: Returns no.of records Updated
 *       400:
 *         description: Given Project Id doesn't exists
 *       500:
 *         description: Error Message
 */
