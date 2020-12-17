const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'A55hole!',
    database: 'employee_tracker_DB',
});

//FUNCTIONS
// start function to decide which action the user would like to perform
const start = () => {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a department, role, or employee", "View a department, role, or employee", "Update a department, role, or employee", "Exit"],
        name: "action"
    }).then(({action}) => {
        switch(action) {
            case "Add a department, role, or employee":
                return addAction();
            case "View a department, role, or employee":
                return viewAction();
            case "Update a department, role, or employee":
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
            case "Go Back":
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
            case "Go Back":
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
            case "Go Back":
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
            department: answer.department,
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
        }
    ]) .then((answer) => {
     
        connection.query(
          'INSERT INTO roles SET ?',
          {
            title: answer.role,
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
        name: 'title',
        type: 'input',
        message: 'What is the employee title(sales, engineer, etc)',
      },
      {
        name: 'department',
        type: 'list',
        message: 'What department will this employee be working in?',
        choices: ["Sales", "Engineering", "Finance", "Legal"]
      },
    ])
    .then((answer) => { //how can I add the base salary info with just entering department
     
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          title: answer.title,
          department: answer.department
        },
        (err) => {
          if (err) throw err;
          console.log('Employee was entered successfully!');

          start();
        }
      );
    });
};

//Functions for view choices
const viewDepartment = () => {
    inquirer
    .prompt({
      name: 'department',
      type: 'list',
      message: 'What department would you like to view?',
      choices: ["Sales", "Engineering", "Finance", "Legal"]
    })
    .then((answer) => {
      console.log(answer.department);
      const query = "SELECT department FROM employee WHERE ?";
      connection.query(query, { department: answer.department }, (err, res) => {
        res.forEach(({ department, first_name, last_name }) => {
          console.log(
            `Department: ${department} || First Name: ${first_name} || Last Name: ${last_name}`
          );
        }); 
        start();
      });
    //   connection.query('SELECT * FROM department', (err, res) => {
    //     if (err) throw err;
    //     console.log(res);
    // });
    //   connection.query(
    //     'SELECT * FROM  WHERE ?',
    //     // { department: answer.department.employee },
    //     (err, res) => { 
    //         console.log(res)
    //       if (res[0]) {
    //         console.log(
    //             // `First Name: ${res[0].first_name} || Last Name: ${res[1].last_name} || Title: ${res[2].title} || Salary: ${res[3].salary}}`
    //         );
    //       } else {
    //         console.error(`No results for ${answer.department}`);
    //       }
    // }
    // );
    start();
    });
};
    


const viewRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(res);
    })
};

const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.log( res
        //   `ID: ${res.id} || First Name: ${res.first_name} || Last Name: ${res.last_name} || Title: ${res.tite} || Department: ${res.department} || Salary: ${res.salary}`
      );
  })
  start();
};


//Functions for update choices
const updateRole = () => {

};

const updateEmployee = () => {

};


//Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected at ${connection.threadId}`);
    start();
  });


