import { Route } from 'react-router-dom'
import React, { Component } from "react"
import ClientsManager from "./clients/ClientsManager"
import ClientList from './clients/ClientList'


export default class ApplicationViews  extends Component {
    state = {
        employees: [],
        clients: []
    }

    componentDidMount() {
        const newState = {}

        ClientsManager.getAll().then(clients => newState.clients = clients).then(() => this.setState(newState))
    }


    render() {
        return(
            <React.Fragment>
                <Route exact path="/clients" render={(props) => {
                    return <ClientList clients={this.state.clients} {...props} />
                }} />
            </React.Fragment>
        )
    }
}