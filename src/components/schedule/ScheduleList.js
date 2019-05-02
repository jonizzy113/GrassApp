import React, { Component } from 'react'
import ScheduleManager from "./ScheduleManager"
import './schedule.css'



export default class ScheduleList extends Component {

    state = {
        mondayData: [],
        tuesdayData: [],
        wednesdayData: [],
        thursdayData: [],
        fridayData:[]
    }
        componentDidMount() {
            const newState = {}
            ScheduleManager.getAll().then(clients => newState.clients = clients).then(() => this.setState(newState))
        }
    
    render() {
        console.log(this.props)
        let mondayData = this.props.clients.filter(client => client.day.name === "Monday")
        let tuesdayData = this.props.clients.filter(client => client.day.name === "Tuesday")
        let wednesdayData = this.props.clients.filter(client => client.day.name === "Wednesday")
        let thursdayData = this.props.clients.filter(client => client.day.name === "Thrusday")
        let fridayData = this.props.clients.filter(client => client.day.name === "Friday")
        
        return (
            <article className="article">
                <section className="card jumbotron text-center">Monday
                {
                    mondayData.map(client =>
                        <div key={client.id} className="">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                </section>
                <section className="card jumbotron text-center">Tuesday
                {
                    tuesdayData.map(client =>
                        <div key={client.id} className="tuesdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                </section>
                <section className="card jumbotron text-center">Wednesday
                {
                    wednesdayData.map(client =>
                        <div key={client.id} className="wednesdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                </section>
                <section className="card jumbotron text-center">Thrusday
                {
                    thursdayData.map(client =>
                        <div key={client.id} className="thrusdayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                </section>
                <section className="card jumbotron text-center">Friday
                {
                    fridayData.map(client =>
                        <div key={client.id} className="fridayCard">
                        <h4>{client.name}</h4>
                        <div>{client.address}</div>
                        <div>{client.service}</div>
                        </div>
                        
                )
                }
                </section>
            </article>
        )
    }
}