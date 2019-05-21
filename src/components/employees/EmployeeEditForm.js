import React, { Component } from 'react'
import EmployeeManager from "./EmployeeManager"
import EmployeeDayManager from "../employeeDay/EmployeeDaymanager"
import './employee.css'


export default class EmployeeEditForm extends Component {
    // setting state 
    state = {
        name: "",
        address: "",
        phoneNumber: "",
        dayId: [],
        checked: []
        // dayIdArray: []
    }

    // handleFieldChange update state when the input field is editied
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    handleEmployeeDays = event => {
        const stateToChange = { dayIdArray: this.state.dayIdArray };
        if (event.target.checked === true) {
            stateToChange.dayIdArray.push(parseInt(event.target.value))
            this.setState(stateToChange)
        } else {
            let dayIndex = stateToChange.dayIdArray.indexOf(parseInt(event.target.value))
            if (dayIndex > -1) {
                stateToChange.dayIdArray.splice(dayIndex, 1)
            }
        }
    }
    // updateExistingEmployee constructs the opbject with ediited infromation and fires the approiate
    // functions to update existing employee
    updateExistingEmployee = event => {
        event.preventDefault();
        const editiedEmployee = {
            id: Number(this.props.match.params.employeeId),
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        // once updateEmployee finishes then redirects back to employees
        this.props.updateEmployee(editiedEmployee).then(() => this.props.history.push("/employees"))
    }
    // grabs the employee information matching the id 
    componentDidMount() {
        EmployeeManager.get(this.props.match.params.employeeId)
            .then(employee => {
                this.setState({
                    name: employee.name,
                    address: employee.address,
                    phoneNumber: employee.phoneNumber
                })

            })
            .then(() => EmployeeDayManager.getDay(this.props.match.params.employeeId))
            .then(employeeDay => {
                console.log(employeeDay)
                this.setState({
                    dayId: employeeDay,
                    checked: true
                })
            })
    }

    checkedBox = (dayID) => {
        console.log(this.state.dayId)
        let bye = this.state.dayId.find(day => day.dayId === dayID)
        // let happy = this.props.days.map(day => {
        //     if (bye.includes(day.name)) {
        //         return true
        //     } else {
        //         return false
        //     }
        // })
        if (bye) {
            return true
        } else {
            return false
        }

    }
    // renders the edit form with the prefilled information as the values
    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                        <label htmlFor="name">Employee Name: </label>
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
                        <label htmlFor="address">Employee Address: </label>
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
                        <label htmlFor="phoneNumber">Employee Phone Number: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                        />
                    </div>
                    <div className="form-group content">
                        <h2 htmlFor="day">Days Available</h2>
                        <div
                            defaultValue=""
                            name="employeeDay"
                            id="dayId"
                            onChange={this.handleFieldChange}
                        >
                            {this.props.days.map(day => (
                                <label>{day.name}
                                    <input type="Checkbox" className="dayList" checked={this.checkedBox(day.id)} onChange={this.handleEmployeeDays} key={day.id} id={day.id} value={day.id} />
                                </label>
                            ))}
                        </div>
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
