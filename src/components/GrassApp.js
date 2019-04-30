import React, { Component } from 'react'
import NavBar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"

export default class GrassApp extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews /> 
            </React.Fragment>
        );
    }
}