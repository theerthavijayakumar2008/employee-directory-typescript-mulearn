interface Employee {
id: number;
name: string;
role: string;
department: string;
email: string;
}

type SearchField = "name" | "role" | "department";

const employees: Employee[] = [
{
id: 1,
name: "Theertha Vijayakumar",
role: "Student Developer",
department: "Computer Science",
email: "theertha@example.com"
},
{
id: 2,
name: "Ananya Nair",
role: "Frontend Developer",
department: "Web Development",
email: "ananya@example.com"
},
{
id: 3,
name: "Arjun Menon",
role: "Data Analyst",
department: "Data Science",
email: "arjun@example.com"
},
{
id: 4,
name: "Meera Thomas",
role: "UI/UX Designer",
department: "Design",
email: "meera@example.com"
}
];

const searchInput =
document.querySelector<HTMLInputElement>("#searchInput");

const employeeList =
document.querySelector<HTMLElement>("#employeeList");

const resultCount =
document.querySelector<HTMLElement>("#resultCount");

function searchEmployees(
list: Employee[],
query: string,
fields: SearchField[] = ["name", "role", "department"]
): Employee[] {
const term = query.trim().toLowerCase();

return list.filter((employee: Employee) =>
fields.some((field: SearchField) =>
employee[field].toLowerCase().includes(term)
)
);
}

function renderEmployees(list: Employee[]): void {
if (!employeeList || !resultCount) return;

resultCount.textContent =
"${list.length} employee(s) found";

if (list.length === 0) {
employeeList.innerHTML =
'<p class="empty">No employees found. Try another search.</p>';
return;
}

employeeList.replaceChildren();

list.forEach((employee: Employee) => {
const card = document.createElement("article");
card.className = "employee-card";

const name = document.createElement("h2");
name.textContent = employee.name;

const role = document.createElement("p");
role.textContent = `Role: ${employee.role}`;

const department = document.createElement("p");
department.textContent = `Department: ${employee.department}`;

const email = document.createElement("p");
email.textContent = `Email / μLearn ID: ${employee.email}`;

const badge = document.createElement("span");
badge.className = "badge";
badge.textContent = `Employee #${employee.id}`;

card.append(name, badge, role, department, email);
employeeList.append(card);

});
}

if (searchInput) {
searchInput.addEventListener("input", () => {
renderEmployees(
searchEmployees(employees, searchInput.value)
);
});
}

renderEmployees(employees);
