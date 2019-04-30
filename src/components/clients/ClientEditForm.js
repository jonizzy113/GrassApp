import React, { Component } from 'react'
import ClientsManager from "./ClientsManager"


export default class ClientEditForm extends Component {
    state = {
        name: "",
        address: "",
        phoneNumber: "",
        service: "",
        dayId: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    updateExistingClient = event => {
        event.preventDefault();
        if (this.state.dayId === "") {
            window.alert("Please select a Day");
        } else {
            const editiedClient = {
                id: Number(this.props.match.params.clientId),
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                service: this.state.service,
                dayId: Number(this.state.dayId)
            }
            this.props.updateClient(editiedClient).then(() => this.props.history.push("/clients"))
        }
    }

    componentDidMount() {
            ClientsManager.get(this.props.match.params.clientId)
            .then(client => {
                this.setState({
                    name: client.name,
                    address: client.address,
                    phoneNumber: client.phoneNumber,
                    service: client.service,
                    dayId: client.dayId
                })
                
            })
    }

    render() {
        console.log(this.props.match.params.clientId)
        return (
            <React.Fragment>
                <form className="clientForm">
                    <div className="form-group">
                        <label htmlFor="name">Client Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="name"
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-grup">
                        <label htmlFor="address">Client Address</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="address"
                            value={this.state.address}
                        />
                    </div>
                    <div className="form-grup">
                        <label htmlFor="phoneNumber">Client Phone Number</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                        />
                    </div>
                    <div className="form-grup">
                        <label htmlFor="service">Client Service</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="service"
                            value={this.state.service}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="day">Assign a Day</label>
                        <select
                            defaultValue=""
                            name="day"
                            id="dayId"
                            onChange={this.handleFieldChange}
                            value={this.state.dayId}
                            >
                            <option value="">Select a Day</option>
                            {this.props.days.map(day => (
                                <option key={day.id} id={day.id} value={day.id}>
                                    {day.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        onClick={this.updateExistingClient}
                        className="btn btn-primary"
                    >
                        Submit
            </button>
                </form>
            </React.Fragment>
        )
    }
}
