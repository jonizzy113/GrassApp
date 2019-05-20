import React, { Component } from 'react'
import './schedule.css'




export default class ScheduleList extends Component {
        // sets intial state
        state = {
            mondayData: [],
            tuesdayData: [],
            wednesdayData: [],
            thursdayData: [],
            fridayData:[],
            mondayEmployee:[],
            tuesdayEmployee:[],
            wednesdayEmployee: [],
            thursdayEmployee: [],
            fridayEmployee: [],
            employeeDays: []
        }

    // gets all the clients information from the database
        componentDidMount() {
            this.props.userData()
        }
        
    
        // renders the client list filtered by the day of the week they are recieving services
    render() {
        let mondayData = this.props.clients.filter(client => client.day.name === "Monday")
        let tuesdayData = this.props.clients.filter(client => client.day.name === "Tuesday")
        let wednesdayData = this.props.clients.filter(client => client.day.name === "Wednesday")
        let thursdayData = this.props.clients.filter(client => client.day.name === "Thursday")
        let fridayData = this.props.clients.filter(client => client.day.name === "Friday")
        let mondayEmployee = this.props.employeeDays.filter(employeeDay => employeeDay.day.name === "Monday")
        let tuesdayEmployee = this.props.employeeDays.filter(employeeDay => employeeDay.day.name === "Tuesday")
        let wednesdayEmployee = this.props.employeeDays.filter(employeeDay => employeeDay.day.name === "Wednesday")
        let thursdayEmployee = this.props.employeeDays.filter(employeeDay => employeeDay.day.name === "Thursday")
        let fridayEmployee = this.props.employeeDays.filter(employeeDay => employeeDay.day.name === "Friday")
        
        return (
            <React.Fragment>
            <article className="article">
                <section className="card scheduleCard jumbotron text-center">
                <h1 className="">Monday</h1>
                <h2>Clients</h2>
                {
                    mondayData.map(client =>
                        <div key={client.id} className="mondayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                <h2>Employees</h2>
                {
                            mondayEmployee.map(employeeDay => 
                                <div key={employeeDay.id}>{employeeDay.employee.name}</div>)
                        }
                </section>
                <section className="card scheduleCard jumbotron text-center">
                <h1 className="display-5">Tuesday</h1>
                <h2>Clients</h2>
                {
                    tuesdayData.map(client =>
                        <div key={client.id} className="tuesdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                <h2>Employees</h2>
                {
                            tuesdayEmployee.map(employeeDay => 
                                <div key={employeeDay.id}>{employeeDay.employee.name}</div>)
                        }
                </section>
                <section className="card scheduleCard jumbotron text-center">
                <h1 className="display-5">Wednesday</h1>
                <h2>Clients</h2>
                
                {
                    wednesdayData.map(client =>
                        <div key={client.id} className="wednesdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                <h2>Employees</h2>
                {
                            wednesdayEmployee.map(employeeDay => 
                                <div key={employeeDay.id}>{employeeDay.employee.name}</div>)
                        }
                </section>
                <section className="card scheduleCard jumbotron text-center">
                <h1 className="display-5">Thrusday</h1>
                <h2>Clients</h2>
                {
                    thursdayData.map(client =>
                        <div key={client.id} className="thrusdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                <h2>Employees</h2>
                {
                            thursdayEmployee.map(employeeDay => 
                                <div key={employeeDay.id}>{employeeDay.employee.name}</div>)
                        }
                </section>
                <section className="card scheduleCard jumbotron text-center">
                <h1 className="display-5">Friday</h1>
                <h2>Clients</h2>
                {
                    fridayData.map(client =>
                        <div key={client.id} className="fridayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                <h2>Employees</h2>
                {
                            fridayEmployee.map(employeeDay => 
                                <div key={employeeDay.id}>{employeeDay.employee.name}</div>)
                        }
                </section>
            </article>
            </React.Fragment>
        )
    }
}