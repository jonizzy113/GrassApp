import React, { Component } from 'react'
import './employee.css'


export default class EmployeeForm extends Component {
    // setting state
    state = {
        name: "",
        address: "",
        phoneNumber: "",
        dayIdArray: [],
    }
        //  handleFieldChange update state when the input field is editied
        handleFieldChange = (event) => {
            const stateToChange = {};
            stateToChange[event.target.id] = event.target.value;
            console.log(stateToChange)
            this.setState(stateToChange);
        };
        handleEmployeeDays = event => {
            const stateToChange = {dayIdArray: this.state.dayIdArray};
            if(event.target.checked === true) {
                stateToChange.dayIdArray.push(parseInt(event.target.value))
                this.setState(stateToChange)
            } else {
                let dayIndex = stateToChange.dayIdArray.indexOf(parseInt(event.target.value))
                if( dayIndex > -1) {
                    stateToChange.dayIdArray.splice(dayIndex,1)
                }
            }
        }
        // constructNewEmployee constructs the object and fires off the funtion to add to the database
    constructNewEmployee = event => {
        event.preventDefault();
        const employee = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            
        }
        const dayArray = this.state.dayIdArray
        this.props.addNewEmployee(employee, dayArray)
        .then(() => this.props.history.push("/employees"))
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
                    <div className="form-group content">
                        <h2 htmlFor="day">Days Available</h2>
                        <div
                            defaultValue=""
                            name="day"
                            id="dayId"
                            onChange={this.handleFieldChange}
                        >
                            {this.props.days.map(day => (
                                <label>{day.name}
                                <input type="Checkbox" className="dayList" onChange={this.handleEmployeeDays} key={day.id} id={day.id} value={day.id}>
                                </input>
                                </label>
                            ))}
                        </div>
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