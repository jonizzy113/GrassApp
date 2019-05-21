import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import ClientsManager from "./clients/ClientsManager"
import ClientList from './clients/ClientList'
import ClientForm from "./clients/ClientForm"
import ClientEditForm from "./clients/ClientEditForm"
import DaysManager from "./days/DaysManager"
import EmployeeList from "./employees/EmployeeList"
import EmployeeForm from "./employees/EmployeeForm"
import EmployeeManager from "./employees/EmployeeManager"
import EmployeeEditForm from './employees/EmployeeEditForm';
import ScheduleManager from "./schedule/ScheduleManager"
import ScheduleList from "./schedule/ScheduleList"
import EmployeeDayManager from "./employeeDay/EmployeeDaymanager"
// import EmployeeDayList from "./employeeDay/EmployeeDayList"
import Login from "./login/Login"
import { withRouter } from "react-router"


class ApplicationViews extends Component {
    // isAuthenticated checks to see if there is employeeId in session storage
    isAuthenticated = () => sessionStorage.getItem("userId") !== null
    // setting state
    state = {
        employees: [],
        clients: [],
        days: [],
        employeeDays: []
    }
    // getting all information
    componentDidMount() {
        this.userData()
    }

    userData = () => {
        const newState = {}

        ClientsManager.getAll()
            .then(clients => newState.clients = clients)
            .then(() => DaysManager.getAll())
            .then(days => newState.days = days)
            .then(() => EmployeeManager.getAll())
            .then(employees => newState.employees = employees)
            .then(() => ScheduleManager.getAll())
            .then(clients => newState.clients = clients)
            .then(() => EmployeeDayManager.getAll())
            .then(employeeDays => newState.employeeDays = employeeDays)
            .then(() => this.setState(newState))
    }
    // once you login it calls userData which gets all the information for the User
    onLogin = () => {
        this.userData()
    }
    //  just clears session storage when the logout button is clicked
    onLogout = () => {
        sessionStorage.clear()
    }

    // addClient post the information from the form to the clients database then does another getAll
    // which gets all the clients including the new one added. Then sets state and displays
    addClient = client =>
        ClientsManager.post(client)
            .then(() => ScheduleManager.getAll())
            .then(clients =>
                this.setState({
                    clients: clients
                })
            );
    //  deleteClient takes the id of the client and removes it from the database 
    // then does a get call to get all the clients then sets state with the client you deleted not showing
    deleteClient = id => ClientsManager.delete(id)
        .then(() => ScheduleManager.getAll())
        .then(clients => {
            this.setState({ clients: clients })
        })
    // updateClient takes the id of the client you edit then saves the new information to the database
    // does another get call then sets state with the new information
    updateClient = (editiedClient) => {
        return ClientsManager.put(editiedClient)
            .then(() => ScheduleManager.getAll())
            .then(clients => {
                this.setState({
                    clients: clients
                })
            })
    }

    // // addEmployee post the information from the form to the employees database then does another getAll
    // which gets all the employees including the new one added. Then sets state and displays
    addEmployee = employee => {
        EmployeeManager.post(employee)
            .then(() => EmployeeManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                }),
                // EmployeeDayManager.post(employee)
                // .then(() => EmployeeDayManager.getAll())
                // .then(employeeDays =>
                // this.setState({
                // employeeDays:employeeDays
                // }))
            )
    };

    addNewEmployee = (employee, dayArray) => {
        const newState = {}
        return EmployeeManager.post(employee)
        .then(newEmployee => {
            console.log(employee, dayArray)
                dayArray.map(day => {
                    const employeeDay = {
                        employeeId: newEmployee.id,
                        dayId: day
                    }
                    console.log(employeeDay)
                    EmployeeDayManager.post(employeeDay)
                })
            })
            .then(() => EmployeeManager.getAll())
            .then(employees => newState.employees = employees)
            .then(() => EmployeeDayManager.getAll())
            .then(employeeDays => newState.employeeDays = employeeDays)
            .then(() => this.setState(newState))
    }



    addEmployeeDay = employeeDay =>
        EmployeeManager.getAll()
            .then(() => EmployeeDayManager.post(employeeDay))
            .then(() => EmployeeDayManager.getAll())
            .then(employeeDays =>
                this.setState({
                    employeeDays: employeeDays
                }))

    //  deleteEmployee takes the id of the employee and removes it from the database 
    // then does a get call to get all the employees then sets state with the employee you deleted not showing
    deleteEmployee = id =>
        EmployeeManager.delete(id).then(() => EmployeeDayManager.delete(id))
            .then(() => EmployeeManager.getAll())
            .then(employees => {
                this.setState({ employees: employees })
            })

    // updateEmployee takes the id of the employee you edit then saves the new information to the database
    // does another get call then sets state with the new information
    updateEmployee = (editiedEmployee) => {
        return EmployeeManager.put(editiedEmployee)
            .then(() => EmployeeManager.getAll())
            .then(employees => {
                this.setState({
                    employees: employees
                })
            })
    }
    // renders the path to Employees, clients, and the schedule
    // also uses isAuthenticated to make sure there is an employeeId in seesion storage
    // if no employeeId in session Storage redirect to login page
    render() {
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/"
                    render={props => {
                        return <Login {...props}
                            onLogin={this.onLogin}
                            userData={this.userData}
                        />
                    }}
                />
                <Route exact path="/clients" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ClientList clients={this.state.clients}
                            deleteClient={this.deleteClient} days={this.state.days}
                            {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route path="/clients/new" render={(props) => {
                    return <ClientForm {...props}
                        addClient={this.addClient}
                        days={this.state.days} />
                }} />
                <Route
                    path="/clients/:clientId(\d+)/edit" render={props => {
                        return <ClientEditForm {...props} days={this.state.days} updateClient={this.updateClient} />
                    }}
                />
                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList employees={this.state.employees}
                            {...props} deleteEmployee={this.deleteEmployee} employeeDays={this.state.employeeDays} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee} addNewEmployee={this.addNewEmployee}
                        days={this.state.days} employeeDays={this.state.employeeDays} />
                }} />
                <Route
                    path="/employees/:employeeId(\d+)/edit" render={props => {
                        return <EmployeeEditForm {...props} updateEmployee={this.updateEmployee} days={this.state.days}
                        employeeDays={this.state.employeeDays}/>
                    }}
                />
                <Route exact path="/schedule" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ScheduleList clients={this.state.clients} employees={this.state.employees}
                            days={this.state.days} employeeDays={this.state.employeeDays} userData={this.userData}
                            {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                {/* <Route exact path="/employeeDay" render={(props) => {
                    if(this.isAuthenticated()) {
                    return <EmployeeDayList employees={this.state.employees}
                    days={this.state.days} employeeDays={this.state.employeeDays}
                        {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} /> */}
            </React.Fragment>
        )
    }
}
export default withRouter(ApplicationViews)
