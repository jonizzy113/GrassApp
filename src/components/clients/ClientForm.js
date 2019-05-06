import React, { Component } from 'react'
import './client.css'


export default class ClientForm extends Component {
    // setting state for imformation going to be used for the form
    state = {
        name: "",
        address: "",
        phoneNumber: "",
        service: "",
        dayId: ""
    }
        //  handleFieldChange update state when the input field is editied
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };
        // createNewClient constructs the object and fires off the funtion to add to the database
    createNewClient = event => {
        event.preventDefault();
        if (this.state.dayId === "") {
            window.alert("Please select a Day");
        } else {
            const client = {
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                service: this.state.service,
                dayId: Number(this.state.dayId)
            }
            // redirects back to clients after object created after addClient is complete
            this.props.addClient(client).then(() => this.props.history.push("/clients"))
        }
    }
        // rendering the form to create the new client
    render() {
        return (
            <React.Fragment>
                <form className="clientForm">
                    <div className="form-group">
                        <label htmlFor="name">Client Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="name"
                            placeholder="Client name"
                        />
                    </div>
                    <div className="form-grup">
                        <labe htmlFor="address">Client Address: </labe>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="address"
                            placeholder="Client address"
                        />
                    </div>
                    <div className="form-grup">
                        <labe htmlFor="phoneNumber">Client Phone Number: </labe>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="phoneNumber"
                            placeholder="Client Phone Number"
                        />
                    </div>
                    <div className="form-grup">
                        <labe htmlFor="service">Client Service: </labe>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="service"
                            placeholder="Client service"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="day">Assign a Day: </label>
                        <select
                            defaultValue=""
                            name="day"
                            id="dayId"
                            onChange={this.handleFieldChange}
                        >
                            <option value="">Select a Day: </option>
                            {this.props.days.map(day => (
                                <option key={day.id} id={day.id} value={day.id}>
                                    {day.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        onClick={this.createNewClient}
                        className="btn btn-primary"
                    >
                        Submit
            </button>
                </form>
            </React.Fragment>
        )
    }
}