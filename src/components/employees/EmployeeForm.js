import React, { Component } from 'react'
import './employee.css'

export default class EmployeeForm extends Component {
    // setting state
    state = {
        name: "",
        address: "",
        phoneNumber: ""
    }
        //  handleFieldChange update state when the input field is editied
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };
        // constructNewEmployee constructs the object and fires off the funtion to add to the database
    constructNewEmployee = event => {
        event.preventDefault();
        const employee = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
                // redirects back to employees after object created after addEmployee is complete
        this.props.addEmployee(employee).then(() => this.props.history.push("/employees"))
    }
            // rendering the form to create the new employee
    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="name"
                            placeholder="Employee name"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="address">Employee Address</label>
                    <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="address"
                            placeholder="Employee adress"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="phoneNumber">Employee Phone Number</label>
                    <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="phoneNumber"
                            placeholder="Employee Phone Number"
                    />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewEmployee}
                        className="btn btn-primary"
                    >
                        Submit
            </button>
                </form>
            </React.Fragment>
        )
    }
}