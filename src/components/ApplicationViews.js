import { Route } from 'react-router-dom'
import React, { Component } from "react"
import ClientsManager from "./clients/ClientsManager"
import ClientList from './clients/ClientList'
import ClientForm from "./clients/ClientForm"
import ClientEditForm from "./clients/ClientEditForm"
import DaysManager from "./days/DaysManager"
// import {withRouter} from "react-router",


export default class ApplicationViews extends Component {
    state = {
        employees: [],
        clients: [],
        days: []
    }

    componentDidMount() {
        const newState = {}

        ClientsManager.getAll()
            .then(clients => newState.clients = clients)
        DaysManager.getAll()
            .then(days => newState.days = days)
            .then(() => this.setState(newState))
    }

    addClient = client =>
        ClientsManager.post(client)
            .then(() => ClientsManager.getAll())
            .then(clients =>
                this.setState({
                    clients: clients
                })
            );

    deleteClient = id => ClientsManager.delete(id)
        .then(() => ClientsManager.getAll())
        .then(clients => {
            this.setState({ clients: clients })
        })

    updateClient = (editiedClient) =>  {
    return ClientsManager.put(editiedClient)
    .then(() => ClientsManager.getAll())
    .then(clients => {
        this.setState({
            clients: clients
        })
    })
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}
