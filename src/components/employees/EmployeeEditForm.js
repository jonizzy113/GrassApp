import React, { Component } from 'react'
import EmployeeManager from "./EmployeeManager"


export default class EmployeeEditForm extends Component {
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

    updateExistingEmployee = event => {
        event.preventDefault();
            const editiedEmployee = {
                id: Number(this.props.match.params.employeeId),
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber
            }
            this.props.updateEmployee(editiedEmployee).then(() => this.props.history.push("/employees"))
        }

        componentDidMount() {
            EmployeeManager.get(this.props.match.params.employeeId)
            .then(client => {
                this.setState({
                    name: client.name,
                    address: client.address,
                    phoneNumber: client.phoneNumber
                })
                
            })
    }

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
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-grup">
                        <label htmlFor="address">Employee Address</label>
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
                        <label htmlFor="phoneNumber">Employee Phone Number</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.updateExistingEmployee}
                        className="btn btn-primary"
                    >
                        Submit
            </button>
            </form>
            </React.Fragment>
        )
    }
}
