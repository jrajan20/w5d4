class Employee {
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordinates = [];
  }

  addSubordinate(subordinate) {
    this.subordinates.push(subordinate);
    subordinate.boss = this;
  }

  get numberOfsubordinates(){
  	return this.subordinates.length;
  }

   get numberOfPeopleToCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }

  
  employeesThatMakeOver(amount) {

    let employees = []; // 1

    if (this.salary > amount) {
      employees.push(this.name); // 2
    }

    for (const subordinate of this.subordinates) {
      const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3
      employees = employees.concat(subordinatesThatMakeOver);
    }

    return employees;
  }

   get totalEmployees() {

    let totalEmployees = 0; // 1

    // Use depth first traversal to calculate the total employees
    for (const subordinate of this.subordinates) {
      	const employeesUnder = subordinate.subordinates.length;
    	totalEmployees += (1 + employeesUnder);
    }
    return totalEmployees;

  }
}

const ada = new Employee("Ada", "CEO", 3000000.00);

const craig    = new Employee("Craig", "VP Software", 1000000);
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela   = new Employee("Angela", "VP Retail", 1000000);
const phil     = new Employee("Phil", "VP Marketing", 1000000);

ada.addSubordinate(craig);
ada.addSubordinate(arvinder);
ada.addSubordinate(angela);
ada.addSubordinate(phil);

const simone  = new Employee("Simone", "Software", 100000);
const ali  	  = new Employee("Ali", "Software", 100000);

craig.addSubordinate(simone);
craig.addSubordinate(ali);

const florida = new Employee("Florida", "Marketing", 100000);
const david   = new Employee("David", "Marketing", 100000);
const brian   = new Employee("Brian", "Marketing", 100000);

phil.addSubordinate(florida);
phil.addSubordinate(david);
phil.addSubordinate(brian);

const karia = new Employee("Angela", "Retail", 80000);
angela.addSubordinate(karia);

console.log(florida.boss.name);
console.log(florida.numberOfsubordinates);
console.log(florida.numberOfPeopleToCEO);

let wealthyEmployees = ada.employeesThatMakeOver(418401);
console.log(wealthyEmployees);

console.log(ada.totalEmployees);
console.log(craig.totalEmployees);






