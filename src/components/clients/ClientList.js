import React, { Component } from 'react'
import './client.css'
// import { Link } from "react-router-dom";


export default class ClientList extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="clientButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/clients/new")
                        }
                        }>
                        Create New Client
                    </button>
                </div>
                <section className="clients">
                    {
                        this.props.clients.map(client => 
                            <div key={client.id} className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{client.name}</h4>
                                    <div>{client.address}</div>
                                    <button
                                            onClick={() => this.props.deleteClient(client.id)}
                                            className="card-link btn btn-danger">Delete</button>
                                    <button
                                            onClick={() => {
                                                this.props.history.push(`/clients/${client.id}/edit`)
                                            }}
                                            className="card-link btn btn-info">Edit</button>
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}