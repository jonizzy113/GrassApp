import { Route } from 'react-router-dom'
import React, { Component } from "react"
// import UserManager from "./user/UserManager"
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
import Login from "./login/Login"
// import {withRouter} from "react-router",


export default class ApplicationViews extends Component {
    state = {
        employees: [],
        clients: [],
        days: []
    }

    componentDidMount() {
        this.userData()
    }

    userData = () => {
        const newState = {}

        ClientsManager.getAll()
        .then(clients => newState.clients = clients)
        .then(() =>DaysManager.getAll())
        .then(days => newState.days = days)
        .then(() =>EmployeeManager.getAll())
        .then(employees => newState.employees = employees)
        .then(() =>ScheduleManager.getAll())
        .then(clients => newState.clients = clients)
        .then(() => this.setState(newState))
    }
    onLogin = () => {
        this.userData()
    }
    
    onLogout = () => {
        sessionStorage.clear()
    }


    addClient = client =>
        ClientsManager.post(client)
            .then(() => ScheduleManager.getAll())
            .then(clients =>
                this.setState({
                    clients: clients
                })
            );

    deleteClient = id => ClientsManager.delete(id)
        .then(() => ScheduleManager.getAll())
        .then(clients => {
            this.setState({ clients: clients })
        })

    updateClient = (editiedClient) => {
        return ClientsManager.put(editiedClient)
            .then(() => ClientsManager.getAll())
            .then(clients => {
                this.setState({
                    clients: clients
                })
            })
    }
    addEmployee = employee =>
        EmployeeManager.post(employee)
            .then(() => EmployeeManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                })
            );

    deleteEmployee = id =>
        EmployeeManager.delete(id)
            .then(() => EmployeeManager.getAll())
            .then(employees => {
                this.setState({ employees: employees })
            })

    updateEmployee = (editiedEmployee) => {
        return EmployeeManager.put(editiedEmployee)
            .then(() => EmployeeManager.getAll())
            .then(employees => {
                this.setState({
                    employees: employees
                })
            })
    }

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
                    return <ClientList clients={this.state.clients}
                        deleteClient={this.deleteClient}
                        {...props} />
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
                    return <EmployeeList employees={this.state.employees}
                        {...props} deleteEmployee={this.deleteEmployee} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        days={this.state.days} />
                }} />
                <Route
                    path="/employees/:employeeId(\d+)/edit" render={props => {
                        return <EmployeeEditForm {...props} updateEmployee={this.updateEmployee} />
                    }}
                />
                <Route exact path="/schedule" render={(props) => {
                    return <ScheduleList clients={this.state.clients}
                    days={this.state.days}
                        {...props} />
                }} />
            </React.Fragment>
        )
    }
}
