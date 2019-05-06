import React, { Component } from 'react'
import './employee.css'

export default class EmployeeList extends Component {
        // responsible for dispalying all the employees and the information associated with the employee
        // Also has the create new employee button along with the Edit and Delete button.
        //  When the edit button is clicked it take the Id of that employee and goes to the edit form

    render () {
        return (
            <React.Fragment>
                <div className="employeeButton">
                    <button type="button"
                        className="btn btn-success  btn-block"
                        onClick={() => {
                            this.props.history.push("/employees/new")
                        }
                        }>
                        Create New Employee
                    </button>
                </div>
                <section className="employees">
                {
                        this.props.employees.map(employee => 
                            <div key={employee.id} className="card employee">
                                <div className="card-body">
                                    <h4 className="card-title">{employee.name}</h4>
                                    <div>{employee.address}</div>
                                    <div>{employee.phoneNumber}</div>
                                    <button
                                            onClick={() => this.props.deleteEmployee(employee.id)}
                                            className="card-link btn btn-danger">Delete</button>
                                    <button
                                            onClick={() => {
                                                this.props.history.push(`/employees/${employee.id}/edit`)
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