create or replace view "employees_reporting_to" as
select e1.emp_id,e1.first_name,e1.designation,e2.first_name reports_to
from
employees e1
join
employees e2
on e1.reports_to = e2.emp_id;

Alter table employees add projects_assigned integer constraint employees_projects_assigned_fk references projects(project_id);