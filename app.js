const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");

let teamArray = [];

// Prompt Menu
function promptMenu() {
    inquirer.prompt ([
        {
            type: "list",
            name: "option",
            message: "What would like to do today?",
            choices: ["Create Engineer", "Create Manager", "Create Intern", "Build Team"]
        }
    ]) .then(answer => {
        if (answer.option === "Create Engineer") {
            promptEngineer();
        } else if (answer.option === "Create Manager") {
            promptManager();
        } else if (answer.option === "Create Intern") {
            promptIntern();
        } else if (answer.option === "Build Team") {
            promptBuildTeam();
        }
    }); 
}

function promptEngineer() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Enter your first name:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter your ID Number:",
        },
        {
            type: "input",
            name: "github",
            message: "What is your GitHub Username?"
        },
    ]) .then(answer => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        teamArray.push(engineer);
        promptMenu();
    }); 
}

function promptManager() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Enter your first name:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter your ID Number:",
        },
        {
            type: "input",
            name: "office",
            message: "Enter your Office Number:"
        },
    ]) .then(answer => {
        const manager = new Manager(answer.name, answer.id, answer.email, answer.office);
        teamArray.push(manager);
        promptMenu();
    }); 
}

function promptIntern() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your First Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your Email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your Employee ID?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of your school?"
        },
    ]) .then(answer => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        teamArray.push(intern);
        promptMenu();
    }); 
}

// Build Team and render to HTML
function promptBuildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

//callback promptMenu
promptMenu();


