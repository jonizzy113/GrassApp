import React, { Component } from 'react'

export default class EmployeeForm extends Component {
    state = {
        name: "",
        address: "",
        phoneNumber: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    constructNewEmployee = event => {
        event.preventDefault();
        const employee = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        this.props.addEmployee(employee).then(() => this.props.history.push("/employees"))
    }

    render() {
        return (
            <React.Fragment>
                <form>
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