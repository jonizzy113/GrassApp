import React, { Component } from 'react'
import EmployeeDayManager from '../employeeDay/EmployeeDaymanager'

export default class ClientList extends Component {
    // responsible for dispalying all the clients and the information associated with the client
    // Also has the create new Client button along with the Edit and Delete button.
    //  When the edit button is clicked it take the Id of that client and goes to the edit form
    
render() {
    return (
        <React.Fragment>
            <section className="employeeDays">
                {
                    this.props.employeeDays.map(employeeDay => 
                        <div key={employeeDay.id} className="card">
                            <div className="card-body">
                                <h4 className="card-title">{employeeDay.employee.name}</h4>
                                <div>{employeeDay.day.name}</div>
                            </div>
                        </div>
                    )
                }
            </section>
        </React.Fragment>
    )
}
}