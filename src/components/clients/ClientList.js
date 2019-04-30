import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class ClientList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="clientBtutton">
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
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}