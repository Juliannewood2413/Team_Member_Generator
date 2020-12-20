const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const logo = require('asciiart-logo');

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker_DB',
});


//FUNCTIONS
function displayLogo() {
  console.log(
      logo({
          name: 'Employee Management System',
          lineChars: 10,
          padding: 2,
          margin: 3,
          borderColor: 'white',
          logoColor: 'white',
          textColor: 'white',
      })
      .render()
  );
}

displayLogo();
// start function to decide which action the user would like to perform
const start = () => {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a department, role, or employee", "View a department, role, or employee", "Update a role or employee", "Exit"],
        name: "action"
    }).then(({action}) => {
        switch(action) {
            case "Add a department, role, or employee":
                return addAction();
            case "View a department, role, or employee":
                return viewAction();
            case "Update a role or employee":
                return updateAction();
            case "Exit":
                connection.end();
        }
    })
};

// functions to complete user choices

const addAction = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to add?",
            name: "addChoice",
            choices: ["Department", "Role", "Employee", "Go back"]
        }
    ]).then(({addChoice}) => {
        switch (addChoice) {
            case "Department":
                return addDepartment();
            case "Role":
                return addRole();
            case "Employee":
                return addEmployee();
            case "Go back":
                return start();
        }
    })
}

const viewAction = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to view?",
            name: "viewChoice",
            choices: ["Department", "Role", "Employee", "Go back"]
        }
    ]).then(({viewChoice}) => {
        switch (viewChoice) {
            case "Department":
                return viewDepartment();
            case "Role":
                return viewRole();
            case "Employee":
                return viewEmployee();
            case "Go back":
                return start();
        }
    })
}

const updateAction = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to update?",
            name: "updateChoice",
            choices: ["Role", "Employee", "Go back"]
        }
    ]).then(({updateChoice}) => {
        switch (updateChoice) {
            case "Role":
                return updateRole();
            case "Employee":
                return updateEmployee();
            case "Go back":
                return start();
        }
    })
}

//Functions for add choices

const addDepartment = () => {
    inquirer.prompt([
        {
            message: "What department would you like to add?",
            name: "department"
        }
    ]).then((answer) => {
        connection.query(
          'INSERT INTO department SET ?',
          {
            name: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log('New department was entered successfully!');
  
            start();
          }
        );
      });
};

const addRole = () => {
    inquirer.prompt([
        {
            message: "What role would you like to add?",
            name: "role"
        },
        {
          message: "What is the base salary for the new role?",
          name: "salary"
        },
        {
          message: "What department is the new role under? 1 = Sales, 2 = Engineering, 3 = Accounting, 4 = Legal. If the new role is under a new department, please enter a new numeric value",
          name: "departmentID"
        }
    ]) .then((answer) => {
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.departmentID
          },
          (err) => {
            if (err) throw err;
            console.log('New role was entered successfully!');
  
            start();
          }
        );
      });

};

const addEmployee = () => {
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Please enter the employees first name',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Please enter the employees last name',
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's role ID? Sales = 1, Engineering = 2, Accounting = 3, Legal = 4",
      }
    ])
    .then((answer) => { 
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id
        },
        (err) => {
          if (err) throw err;
          console.log('Employee was entered successfully!');

          start();
        }
      );
    });
};
var initialDepartments = ["Sales", "Engineering", "Accounting", "Legal"]
//Functions for view choices
const viewDepartment = () => {
    inquirer
    .prompt({
      name: 'department',
      type: 'list',
      message: 'What department would you like to view?',
      choices: initialDepartments
    }).then(({department}) => {
      switch (department) {
          case "Sales":
              let query = `
              SELECT employee.id, first_name, last_name, role.title, role.salary, name
              FROM employee
              LEFT JOIN role
              ON role_id = role.id
              LEFT JOIN department
              ON department_id = department.id`
              connection.query(query, (err, res) => {
                      console.table(res.filter((variable) => department == variable.name));
                      start();
                    });
                    break;
          case "Engineering":
              let eQuery = `
              SELECT employee.id, first_name, last_name, role.title, role.salary, name
              FROM employee
              LEFT JOIN role
              ON role_id = role.id
              LEFT JOIN department
              ON department_id = department.id`
              connection.query(eQuery, (err, res) => {
                      console.table(res.filter((variable) => department == variable.name));
                      start();
                    });
                    break;
          case "Accounting":
            let fQuery = `
            SELECT employee.id, first_name, last_name, role.title, role.salary, name
            FROM employee
            LEFT JOIN role
            ON role_id = role.id
            LEFT JOIN department
            ON department_id = department.id`
            connection.query(fQuery, (err, res) => {
                  console.log(res)
                    console.table(res.filter((variable) => department == variable.name));
                    start();
                  });
                  break;
          case "Legal":
            let lQuery = `
            SELECT employee.id, first_name, last_name, role.title, role.salary, name
            FROM employee
            LEFT JOIN role
            ON role_id = role.id
            LEFT JOIN department
            ON department_id = department.id`
            connection.query(lQuery, (err, res) => {
                    console.table(res.filter((variable) => department == variable.name));
                    start();
                  });
                  break;
      }
  })
  
    
};
    


const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      //for each??
      console.table(res);
        start();
  })
};


//Functions for update choices
const updateRole = () => {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    choices: ["Delete a role", "Change the role information", "Go Back"],
    name: "roleUpdateChoice"
  }).then(({roleUpdateChoice}) => {
    switch (roleUpdateChoice) {
        case "Delete a role":
            return deleteRole();
        case "Change the role information":
            return addRole();
        case "Go Back":
            return start();
    }
})

};

const updateEmployee = () => {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    choices: ["Delete an employee", "Change the employee information", "Go Back"],
    name: "employeeUpdateChoice"
  }).then(({employeeUpdateChoice}) => {
    switch (employeeUpdateChoice) {
        case "Delete an employee":
            return deleteEmployee();
        case "Change the employee information":
            return addEmployee(); 
        case "Go Back":
            return start();
    }
})
};

//Delete functions 

const deleteRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    inquirer.prompt([
      {
        name: "roleList",
        type: "list",
        choices() {
          const rolesArray = [];
          res.forEach(({title}) => {
            rolesArray.push(title);
          });
          return rolesArray;
        },
        message: "What role would you like to remove from the database?"
      }
    ]).then(({roleList}) => {
      connection.query('DELETE FROM role WHERE ?', 
      {
        title: roleList
      },
       function (err, res) {
        if (err) throw err;
        console.log("Delete Successful!");
        start();
      }
      );
    
    })
  }) 
}

const deleteEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
   const employeeDelete =  inquirer.prompt([
      {
        name: "employeeDelete",
        type: "list",
        choices() {
          const employeeArray = [];
          res.forEach(({last_name}) => {
            employeeArray.push(last_name);
          });
          return employeeArray;
        },
        message: "Which employee would you like to remove from the database?"
      }
      ]).then(({employeeDelete}) => {
        connection.query('DELETE FROM employee WHERE ?', 
        {
          last_name: employeeDelete
        },
         function (err, res) {
          if (err) throw err;
          console.log("Delete Successful!");
          start();
        }
        );
      
      })
  })
}



//Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected at ${connection.threadId}`);
    start();
  });


