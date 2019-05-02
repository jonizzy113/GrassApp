import React, { Component } from 'react'
import './employee.css'

export default class EmployeeList extends Component {
    

    render () {
        return (
            <React.Fragment>
                <div className="employeeButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/employees/new")
                        }
                        }>
                        Create New Employee
                    </button>
                </div>
                <section section="employees">
                {
                        this.props.employees.map(employee => 
                            <div key={employee.id} className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{employee.name}</h4>
                                    <div>{employee.address}</div>
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